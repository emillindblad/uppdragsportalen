import { FunctionComponent, useState } from "react";
import type { Uppdrag } from "@prisma/client";


interface SortableHeaderProps {
    data: Uppdrag[],
    id: string,
    sortBy: string,
    label: string,
}

const SortableHeader: FunctionComponent<SortableHeaderProps> = (props: SortableHeaderProps) => {

    const arrows = { ascending: '↓', descending: '↑' }
    
    let dir = "";
    if (sortStatus === 1) {
        dir = "ascending";
    } else if (sortStatus === -1) {
        dir = "descending";
    } else dir = "default";
    
    const arrow = sortBy === id ? arrows[dir] : ''
  
    return (
      <p id={id} onClick={() => orderRow(sortBy)}>
        {label} {arrow}
      </p>
    )
} 

export default SortableHeader;
