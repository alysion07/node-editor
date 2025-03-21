import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

function NodeItem({label,position, children}) {
    const { attributes, listeners, setNodeRef, transform, isDragging, isActive  } = useDraggable({
        id: "isDragging",
        data:{
            type: 'node',
        }
    });

    const handlePostMouseDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('mousedown');
    }
    const handlePostMouseUp = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('mouseup');
    }

    const handlePortClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('port click');
    }
    const renderPorts = (ports) => {
        return (
            <div className={"port"}
                 style={{width:'20px', height: '20px', backgroundColor:'blue'}}
                 onMouseDown={handlePostMouseDown}
                 onMouseUp={handlePostMouseUp}
                 onClick={handlePortClick}
            >
                <div className="port-dot"></div>
                <div className="port-label">{ports?.label}</div>
            </div>
        );
    }
    const style = {
        width: '200px',
        height: '80px',
        position: 'absolute',
        left: position.x,
        top: position.y,
        backgroundColor: 'white',
        opacity: isDragging ? 0.5 : 1.0,
        touchAction: 'none',
        transform: CSS.Translate.toString(transform),
    }

    return (
        <div className={"node-container"}
            ref={setNodeRef}
            style={style}
            {...isDragging}
            {...listeners}
            {...attributes}
        >
            <div className="node-header">

                {/*<div className="node-icon">{componentDef.icon}</div>*/}
                {/*<div className="node-title">{componentDef.label}</div>*/}
                {/*{!isOverlay && (*/}
                {/*    <button*/}
                {/*        className="node-delete-btn"*/}
                {/*        onClick={(e) => {*/}
                {/*            e.stopPropagation();*/}
                {/*            if (onDelete) onDelete();*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        ×*/}
                {/*    </button>*/}
                {/*)}*/}
            </div>
            {renderPorts()}
            {children}
            <div>{label}</div>
            {                `pos: ${position.x}, ${position.y}`            }
        </div>


    );
}

export default NodeItem