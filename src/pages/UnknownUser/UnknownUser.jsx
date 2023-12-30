import React from "react";
import NavBar from "../../components/Userside/NavBarhome/NavBar";
import Footer from "../../components/Userside/footer/footer";

function PagenotFound() {
  return (
    <div>
      <NavBar />
      <div className="h-[15rem] w-full">
        <p className="text-center mt-56 text-4xl font-semibold"> Page Not Found</p>
      </div>
      <Footer />
    </div>
  );
}

export default PagenotFound;
