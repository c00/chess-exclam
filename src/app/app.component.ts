import { Component } from '@angular/core';
import { ChessSquare } from '../model/ChessSquare';
import { ChessBoard } from '../model/ChessBoard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  square: ChessSquare;
  board = new ChessBoard();

  squareClick(e: ChessSquare) {
    this.square = e;
    console.log('Clicked on', e.coords);
  }
}
