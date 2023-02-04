import React, {FC, useEffect, useState} from 'react';
import s from "./BoardComponent.module.scss"
import {Board} from "../../models/Board";
import CellComponent from "../CellComponent/CellComponent";
import {Cell} from "../../models/Cell";
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";

interface BoardProps{
    board:Board;
    setBoard:(board:Board) => void
    currentPlayer:Player | null
    swapPlayer:() => void
}

const BoardComponent:FC<BoardProps> = ({board,setBoard,currentPlayer,swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click(cell:Cell){
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
            updateBoard()
        }else {
            if(cell.figure?.color === currentPlayer?.color){
                setSelectedCell(cell)
            }
        }
    }


    const highlightCells = () => {
        board.highlightCells(selectedCell)
        updateBoard()
    }
    const updateBoard = () =>{
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }
    useEffect(() => {
        highlightCells()
    },[selectedCell])
    return (
        <div className={s.wrapper}>
         <h1 className={s.Player}>Текущий игрок <span>{currentPlayer?.color === Colors.WHITE ? 'Белые' : 'Черные'}</span></h1>
        <div className={s.board}>
            {board.cells.map((row,index) =>
                <React.Fragment key = {index}>
                    {row.map(cell =>
                    <CellComponent
                        click = {click}
                        cell={cell}
                        key={cell.id}
                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>
                    )}
                </React.Fragment>
            )}
        </div>
        </div>
    );
};

export default BoardComponent;