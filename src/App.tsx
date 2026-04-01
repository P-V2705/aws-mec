/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import Roadmaps from "./sections/Roadmaps";
import Events from "./sections/Events";
import CoreTeam from "./sections/CoreTeam";
import Labs from "./components/labs/Labs";
import JoinUs from "./sections/JoinUs";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import CyberGrid from "./components/CyberGrid";

export default function App() {
  return (
    <div className="min-h-screen selection:bg-neon-purple/30 selection:text-white">
      <CustomCursor />
      <CyberGrid />
      <Navbar />
      <main className="relative z-10">
        <Home />
        <Roadmaps />
        <Events />
        <CoreTeam />
        <Labs />
        <JoinUs />
      </main>
      <Footer />
    </div>
  );
}
