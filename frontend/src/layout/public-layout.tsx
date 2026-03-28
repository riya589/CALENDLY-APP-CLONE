import { Outlet } from "react-router-dom";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

