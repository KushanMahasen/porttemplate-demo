import type { InputNode } from "../PortTemplate/types";

export interface InputRowProps {
    node: InputNode;
    updateNode: (node: InputNode) => void;
    deleteNode: (id: string) => void;
    addChildNode: (id: string) => void;
}
