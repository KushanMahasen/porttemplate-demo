import React, { useState } from "react";
import type { InputNode } from "./types";
import InputRow from "../InputRow/InputRow";
import styles from "./PortTemplate.module.css";

const PortTemplate: React.FC = () => {
    const [nodes, setNodes] = useState<InputNode[]>([]);

    const addRootNode = () => {
        setNodes([
            ...nodes,
            { id: Date.now().toString(), value: "", readOnly: false, children: [] },
        ]);
    };

    const updateNode = (updatedNode: InputNode, parentNodes = nodes) => {
        const update = (list: InputNode[]): InputNode[] =>
            list.map((node) =>
                node.id === updatedNode.id
                    ? updatedNode
                    : { ...node, children: update(node.children) }
            );
        setNodes(update(parentNodes));
    };

    const deleteNode = (id: string, parentNodes = nodes) => {
        const filterNodes = (list: InputNode[]): InputNode[] =>
            list
                .filter((node) => node.id !== id)
                .map((node) => ({ ...node, children: filterNodes(node.children) }));
        setNodes(filterNodes(parentNodes));
    };

    const addChildNode = (id: string, parentNodes = nodes) => {
        const add = (list: InputNode[]): InputNode[] =>
            list.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        children: [
                            ...node.children,
                            {
                                id: Date.now().toString(),
                                value: "",
                                readOnly: false,
                                children: [],
                            },
                        ],
                    };
                }
                return { ...node, children: add(node.children) };
            });
        setNodes(add(parentNodes));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.addButton} onClick={addRootNode}>
                    +
                </button>
                <div className={styles.headerButtons}>
                    <button className={styles.backButton}>Back</button>
                    <button className={styles.saveButton}>Save</button>
                </div>
            </div>

            <div className={styles.rootLevel}>
                {nodes.map((node) => (
                    <InputRow
                        key={node.id}
                        node={node}
                        updateNode={updateNode}
                        deleteNode={deleteNode}
                        addChildNode={addChildNode}
                    />
                ))}
            </div>
        </div>
    );
};

export default PortTemplate;
