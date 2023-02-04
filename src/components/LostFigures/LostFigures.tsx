import React, {FC} from 'react';
import {Figure} from "../../models/figures/Figure";
import s from "./LostFigures.module.scss"

interface LostFiguresProps{
    title:string
    figures:Figure[]
}

const LostFigures:FC<LostFiguresProps> = ({title, figures}) => {
    return (
        <div className={s.lost}>
            <h1>{title}</h1>
            {figures.map(figure =>
                <div key ={figure.id}>
                    {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo} alt={''}/>}
                </div>
            )}
        </div>
    );
};

export default LostFigures;