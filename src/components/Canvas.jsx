import NodeItem from "./NodeItem.jsx";
import {DndContext, useDroppable, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";


function Canvas({ref, nodes}) {
    const { setNodeRef } = useDroppable({
        id: 'canvas'
    });

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
    );

    const handleCanvasDragStart = (e) => {
        console.log("Canvas drag start");
    }
    const handleCanvasDragEnd = (e) => {
        console.log("Canvas drag end");
    }
    return(
        <DndContext
            sensors={sensors}
            onDragStart={handleCanvasDragStart}
            onDragEnd={handleCanvasDragEnd}
        >
            <div
                ref={setNodeRef}
                className='canvas'
                style = { {width :"100vw", height:"100vh", backgroundColor :"grey",
            position: "relative"}}
            >
                {

                nodes.map(node => (
                    <NodeItem key={node.id}
                              label={node.id}
                              position={node.position}
                    ></NodeItem>
                ))
                }



            </div>
        </DndContext>
        );
}

export default Canvas