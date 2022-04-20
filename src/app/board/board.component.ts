import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChessBoard } from '../../model/ChessBoard';
import { ChessSquare } from '../../model/ChessSquare';

@Component({
  selector: 'exclam-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Output() squareClick = new EventEmitter<SquareClickEvent>();
  @Input() size = 600;
  @Input() centerText: string;
  @Input() board: ChessBoard;

  get squareSize(): number {
    return this.size / 8;
  }

  constructor() {}

  ngOnInit() {
    if (!this.board) this.board = new ChessBoard();
  }

  onClick(square: ChessSquare, event: MouseEvent) {
    this.squareClick.emit({ square, event });
  }
}

export interface SquareClickEvent {
  square: ChessSquare;
  event: MouseEvent;
}
