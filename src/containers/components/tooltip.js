import React from 'react';

export const Tooltip = (props) => {

    window.addEventListener("load", function(event) {
        setTimeout(() => {
            let items = document.querySelectorAll("[tooltip]");
            items = Array.apply(null, items);
            items.forEach(item => {
                let tooltip = document.querySelector(".tooltip");
    
                item.addEventListener("mouseover", (e) => {
                    tooltip.innerHTML = item.getAttribute("tooltip");
                    tooltip.style.opacity= "1";
    
                    let styleTooltip = window.getComputedStyle(tooltip);
    
                    let heightTooltip = styleTooltip.height.replace("px", "");
    
                    tooltip.style.top=`${(e.pageY - e.offsetY) - heightTooltip - 15}px`;
                    tooltip.style.left=`${(e.pageX - (e.offsetX / 2)) - 50}px`;
                })
    
                item.addEventListener("mouseleave", (e) => {
                    tooltip.style.opacity= "0";
                })
            })
        },100)
    });

    return(
        <div className="tooltip">
            Soy un tooltip
        </div>
    )
}