import React from "react";

function ContentWrapper({ children, className }) {
  //   console.log(customClass);
  return (
    <div className={`w-full max-w-[1280px] mx-auto my-0  py-0 ` + className}>
      {children}
    </div>
  );
}

export default ContentWrapper;
// .contentWrapper {
//     width: 100%;
//     max-width: 1200px;
//     margin: 0 auto;
//     padding: 0 20px;
// }
