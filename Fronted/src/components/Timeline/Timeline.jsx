import React from "react";
import "./Timeline.css"; // Archivo CSS separado

const Timeline = ({ stepCount }) => {
  const steps = [
    { id: 1, title: "Pendiente" },
    { id: 2, title: "Pagado" },
    { id: 3, title: "Proceso" },
    { id: 4, title: "Enviado" },
    { id: 5, title: "Entregado" },
  ];

  return (
    <div className="timeline-container">
      <ol className="timeline">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={`timeline-step ${
              index < steps.length - 1 ? "has-line" : ""
            }`}
          >
            <div className="step-container">
              <div
                className={`step-circle ${
                  step.id <= stepCount ? "active" : ""
                }`}
              />
              {index < steps.length - 1 && (
                <div
                  className={`step-line ${step.id < stepCount ? "active" : ""}`}
                />
              )}
            </div>
            <div className="step-title">
              <h3>{step.title}</h3>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
