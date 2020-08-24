import React from 'react';

function TechItem({tech, onDelete}){
    return (
        <li key={tech}>
            {tech}
            <button id="li_but" onClick={onDelete} type='button'>Deletar</button>
        </li>
    );
}

export default TechItem;