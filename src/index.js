import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
            return ( 
               <button 
               className={props.styleSquare} data-pro={props.value}
                onClick={props.onClick}
                 >
                    {props.value} 
                    </button> 
                  );
            }
                      
            class Board extends React.Component {
              renderSquare(i) {
                return (
                  <Square
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                    styleSquare = {this.props.styleSquare[i]}
                  />
                );
              }
            

            // Two loops to create the board! Took so long to do this so don't forget it!!!
  render() {
    
    const index = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    const rows = index.map((i) => {
          
         var cells = i.map((j) => {
          return ( <label key={j.toString()}>{this.renderSquare(j)}</label>);
         });
        return( 
           <div key={i.toString()} className="board-row"> 
               {cells}
          </div>
              );
    });
    
    return (
      <div>
        {rows}
      </div>
    );
  }
}


        class Game extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            history: [{
              squares: Array(9).fill(null),
            lastMove: null,
            
            }
          ],
            stepNumber: 0,
            xIsNext: true,
            styleSquare: Array(9).fill("square"),
            ascend: false,
          };
          this.toggle = this.toggle.bind(this);
        }

        handleClick(i) {
          var history = this.state.history.slice(0, this.state.stepNumber + 1);
         const current = history[history.length - 1];
         const squares = current.squares.slice();
         var styleSquare = this.state.styleSquare.slice();
        const lastMove = [i%3, Math.floor(i/3)];
    
    
    if (calculateWinner(squares) || squares[i]) {
            return;
          }
          squares[i] = this.state.xIsNext ? 'X' : 'O';
          const winner = calculateWinner(squares);
    
          this.setState({
            history: history = history.concat([
              {
              squares: squares,
              lastMove: lastMove,
            }
          ]),
            stepNumber: history.length - 1,
            xIsNext: !this.state.xIsNext,
          });
              
        if(winner){
          this.onWin(winner, styleSquare);
          }
          
        }
        onWin(winner, styleSquare){
            styleSquare[winner[0]] = "win";
            styleSquare[winner[1]] = "win";
            styleSquare[winner[2]] = "win";
          
            this.setState({
            styleSquare: styleSquare,
          });
          }
      
        jumpTo(step) {
          var history = this.state.history.slice(0, step + 1);
          const current = history[history.length - 1];
          const squares = current.squares.slice();
          var styleSquare = this.state.styleSquare.slice();
          const winner = calculateWinner(squares);
  
          this.setState({
           stepNumber: step,
           xIsNext: (step % 2) === 0,
          });
        
          if(winner){
            this.onWin(winner, styleSquare);
          } else {
            this.setState({
            styleSquare: Array(9).fill("square"),
          });
          }
          
        }
        
        toggle(){
          this.setState({
            ascend: !this.state.ascend,
          });
        }

            render() {
             const history = this.state.history;
             const current = history[this.state.stepNumber];
             const winner = calculateWinner(current.squares);
             
             const toggle = this.state.ascend ? "Ascending" : "Descending";
      
             const moves = history.map((step, move) => {
              if(this.state.ascend){
                move = history.length - 1 - move; //Display descending
              }
              
              const desc = move ?
              'Go to move #' + move + ' at position (' + history[move].lastMove.toString() +')'  :
              'Go to game start';
              if(move === this.state.stepNumber){
              return (
              <li key={move}>
            <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
          </li>
        );
      } else {
        return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
      }
      
    });
     
    let status;
    if (winner) {
      status = "Winner: " + current.squares[winner[0]];
    } else if (!current.squares.includes(null)) {
      status = "It's a draw!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }


             return ( 
                    <div className="game">
                      <div className="game-board">
                   <Board 
                   squares={current.squares}
                   onClick={ (i) => this.handleClick(i)}
                   styleSquare={this.state.styleSquare}
                   />
                    </div> 
                    <div className="game-info">
                    <div>{status}</div> 
                    <button onClick = {this.toggle}>{toggle}</button>
                    <ol>{moves} </ol> 
                    </div> 
                    </div>
                );
            }
        }

        // ========================================

        ReactDOM.render( 
          <Game />,
            document.getElementById("root")
        );

        function calculateWinner(squares) {
          const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return [a, b, c];
            }
          }
          return null;
        }