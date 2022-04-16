import { Game, Challenge, ChallengeResult } from './Game';
import { ChessBoard } from './ChessBoard';

describe('Game', () => {
  test('starting a game', () => {
    const board = new ChessBoard();
    const g = new Game(board.squares, 'pick-square');
    
    const challenge = g.start();
    expect(challenge).toBeDefined();
    g.stop();

    expect(g.score).toBe(0);
    expect(g.mistakes).toBe(0);
    expect(g.state).toBe('stopped');
    // expect(challenge.mode).toBe('pick-square');
    // expect(challenge.answer.length).toBe(2);
  });

  test('check pick square Challenge', () => {
    const board = new ChessBoard();
    const g = new Game(board.squares, 'pick-square');
    
    const challenge = g.start();
    expect(challenge).toBeDefined();
    expect(challenge.mode).toBe('pick-square');
    expect(challenge.answer.length).toBe(2);
    expect(challenge.options).toBeUndefined();

    let result: ChallengeResult;
    result = g.solveChallenge(challenge, 'xx');
    expect(result.correct).toBe(false);
    expect(result.nextChallenge).toBe(challenge);

    result = g.solveChallenge(challenge, challenge.answer);
    expect(result.correct).toBe(true);
    expect(result.nextChallenge).not.toBe(challenge);
    g.stop();
  });

  test('check pick coords Challenge', () => {
    const board = new ChessBoard();
    const g = new Game(board.squares, 'pick-coords');
    
    const challenge = g.start();
    expect(challenge).toBeDefined();
    expect(challenge.mode).toBe('pick-coords');
    expect(challenge.answer.length).toBe(2);
    expect(challenge.options.length).toBe(4);

    expect(challenge.options.indexOf(challenge.answer)).toBeGreaterThan(-1);

    let result: ChallengeResult;
    result = g.solveChallenge(challenge, 'xx');
    expect(result.correct).toBe(false);
    expect(result.nextChallenge).toBe(challenge);

    result = g.solveChallenge(challenge, challenge.answer);
    expect(result.correct).toBe(true);
    expect(result.nextChallenge).not.toBe(challenge);
    g.stop();
  });
});
