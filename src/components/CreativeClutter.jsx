import { useState } from "react";
import { deskItems, modes } from "../data/creativeClutter";
import { useDeskLayout } from "../hooks/useDeskLayout";

export default function CreativeClutter() {
  const [activeMode, setActiveMode] = useState("chaos");
  const { deskRef, headerRef, setItemRef, switchMode } =
    useDeskLayout(setActiveMode);

  return (
    <section className="desk" ref={deskRef}>
      <div className="header" ref={headerRef}>
        <h1>Creative Clutter</h1>
        <p>
          The best ideas live somewhere between a coffee stain and a half-open
          folder, scattered things have a way of finding others when you stop
          trying to organize.
        </p>
      </div>

      {deskItems.map(({ id, src }) => (
        <div className="item" id={id} key={id} ref={setItemRef(id)}>
          <img src={src} alt="" />
        </div>
      ))}

      <div className="modes">
        {modes.map(({ id, icon }) => (
          <button
            key={id}
            type="button"
            className={activeMode === id ? "active" : ""}
            data-mode={id}
            onClick={() => switchMode(id)}
          >
            <ion-icon name={icon}></ion-icon>
          </button>
        ))}
      </div>
    </section>
  );
}
