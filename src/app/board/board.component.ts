import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChessBoard } from '../../model/ChessBoard';
import { ChessSquare } from '../../model/ChessSquare';

@Component({
  selector: 'exclam-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Output() squareClick = new EventEmitter<ChessSquare>();
  @Input() size = 400;
  @Input() board: ChessBoard;


  get squareSize(): number {
    return this.size / 8;
  }


  constructor() {}

  ngOnInit() {
    if (!this.board) this.board = new ChessBoard();
  }
}
