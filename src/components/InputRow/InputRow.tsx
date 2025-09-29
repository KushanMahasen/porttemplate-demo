import React, { useState } from "react";
import type { InputRowProps } from "./types";
import styles from "./InputRow.module.css";

const InputRow: React.FC<InputRowProps> = ({ node, updateNode, deleteNode, addChildNode }) => {
    const [hovered, setHovered] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateNode({ ...node, value: e.target.value });
    };

    const toggleReadOnly = () => {
        updateNode({ ...node, readOnly: !node.readOnly });
    };

    return (
        <div className={styles.rowContainer}>
            <div
                className={styles.row}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <input
                    value={node.value}
                    onChange={handleChange}
                    readOnly={node.readOnly}
                    className={node.readOnly ? styles.readOnlyInput : ""}
                />
                {hovered && (
                    <div className={styles.options}>
                        <div className={styles.optionGroup}>
                            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <div className={styles.toggleSwitch}>
                                    <input
                                        type="checkbox"
                                        checked={node.readOnly}
                                        onChange={toggleReadOnly}
                                    />
                                    <span className={styles.slider}></span>
                                </div>
                                <span className={styles.toggleLabel}>Read Only</span>
                            </label>
                            <button onClick={() => deleteNode(node.id)}>🗑</button>
                        </div>

                        <button className={styles.addChild} onClick={() => addChildNode(node.id)}>+</button>
                    </div>
                )}

            </div>

            {node.children.length > 0 && (
                <div className={styles.children}>
                    {node.children.map(child => (
                        <InputRow
                            key={child.id}
                            node={child}
                            updateNode={updateNode}
                            deleteNode={deleteNode}
                            addChildNode={addChildNode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default InputRow;
