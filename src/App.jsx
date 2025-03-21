import {useState, useReducer, useRef, useEffect} from 'react'
import {componentTypes} from "./components/ComponentType.jsx";
import { generateId } from './utils/helpers';
import { reducer, getInitialState } from "./reducers/editorReducer.jsx";

import Canvas from "./components/Canvas.jsx";
import ComponentPalette from "./components/ComponentPalette.jsx";

import './styles/App.css'
import {DndContext,
    useSensor, useSensors, PointerSensor, MouseSensor,
} from "@dnd-kit/core";

function App() {
    const [state, dispatch] = useReducer(reducer, null, getInitialState);
    const [paletteWidth, setPaletteWidth] = useState(160); // 초기값 설정
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // 마우스 이벤트 핸들러 함수
        function handleGlobalMouseMove(event) {
            setMousePosition({
                x: event.clientX,
                y: event.clientY
            });
        }

        // 문서에 이벤트 리스너 추가
        document.addEventListener('mousemove', handleGlobalMouseMove);

        // 컴포넌트가 언마운트될 때 정리(cleanup) 함수
        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, []); // 빈 배열은 이 효과가 마운트/언마운트 시에만 실행됨을 의미

    // Configure sensors for drag interactions
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    const handleDragStart = (e) => {
        console.log('drag start');
    }

    const handleDragMove = () => {
        console.log('drag move');
    }
    const handleDragEnd = (event) => {
        const { active, over, delta } = event;

        if (active.data.current?.type === 'palette-item' && over?.id === 'canvas') {

            // get 'component type' from palette item
            const componentType = active.data.current.component.type;

            if (over) {
                //case1
                const t = over.rect.top;
                const l = over.rect.left;
                const newX = mousePosition.x - l;
                const newY = mousePosition.y - t;

                //case2
                const clientX = event.activatorEvent.clientX;
                const clientY = event.activatorEvent.clientY;
                console.log('clientX', clientX,'  clientY:', clientY);
                console.log('new x:', newX,'  new y:', newY);

                dispatch({
                    type: 'ADD_NODE',
                    payload: {
                        id: generateId(),
                        type: componentType,
                        position: {
                            x: newX,
                            y: newY,
                        },
                        data: { ...active.data.current.component.defaultData }
                    }
                });
            }

        }
    }
    return (
      <div className="app">
        <div>
          <h2>{`x:${mousePosition.x}, y: ${mousePosition.y}`}</h2>
        </div>
        <div className="main-container">
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                onPointerMove={handleDragMove}

            >

            <div className="left-panel">
                <ComponentPalette
                    components={state.present.componentTypes}
                    setPaletteWidth = {setPaletteWidth}
                />
            </div>
            <div className="center-panel">cetner panel
                <Canvas
                    nodes={state.present.nodes}
                />
            </div>
            <div className="right-panel">right panel
            </div>
                {/*<DragOverlay>*/}
                {/*    {if (state.present.selectedNodeId) {*/}
                {/*        <div style={{width: "10px", height: "10px", backgroundColor: "red"}}>*/}
                {/*    }*/}

                {/*    </div>*/}
                {/*</DragOverlay>*/}
            </DndContext>
        </div>
      </div>
  );
}

export default App
