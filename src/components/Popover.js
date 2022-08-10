import React, { forwardRef, useEffect, useRef } from "react";
import { Popover } from "@headlessui/react";

const useForwardRef = (ref) => {
  const innerRef = useRef(null);
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
      // innerRef.current = ref.current;
    }
  }, []);
  return innerRef;
};

export const PopoverCustom = ({ label, options, getValue }) => {
  const panelRef = useRef();
  const btnRef = useRef();
  return (
    <div style={{ paddingTop: "50px" }}>
      <Popover className="relative" style={{ display: "inline-block" }}>
        <Popover.Button as={PopOverButton} ref={btnRef}>
          {label}
        </Popover.Button>
        <Popover.Panel
          as={PopOverPanel}
          className="absolute z-10"
          ref={panelRef}
        >
          <div className="grid grid-cols-2">
            {options.map((el, idx) => (
              <li key={idx}>{getValue(el)}</li>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};

const PopOverButton = forwardRef((props, ref) => {
  const safeRef = useForwardRef(ref);
  console.log({ safeRef });
  const mouseEnterBtn = (e) => {
    e.target.click();
  };
  const mouseLeaveBtn = (e) => {
    const isEnterPanel = safeRef.current?.nextSibling?.contains(
      document.elementFromPoint(e.clientX, e.clientY)
    );
    if (!isEnterPanel) {
      e.target.click();
    }
  };
  return (
    <button
      ref={safeRef}
      {...props}
      onMouseEnter={mouseEnterBtn}
      onMouseLeave={mouseLeaveBtn}
    >
      {props.children}
    </button>
  );
});

const PopOverPanel = forwardRef((props, ref) => {
  const safeRef = useForwardRef(ref);
  const mouseLeavePanel = (e) => {
    const isEnterBtn = safeRef.current?.previousSibling?.contains(
      document.elementFromPoint(e.clientX, e.clientY)
    );
    if (!isEnterBtn) {
      safeRef.current?.previousSibling?.click();
    }
  };
  return (
    <div ref={safeRef} {...props} onMouseLeave={mouseLeavePanel}>
      {props.children}
    </div>
  );
});
