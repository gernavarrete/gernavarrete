import React from "react";

export default function CvDocument() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <object
        data={require("../../documents/CVGermanNavarrete.pdf")}
        type="application/pdf"
        width="100%"
        height="100%"
      ></object>
    </div>
  );
}
