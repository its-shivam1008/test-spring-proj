import React, { useEffect, useState } from 'react'
import "./App.css";
import Dashboard from './components/Dashboard';
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <>
      <Dashboard></Dashboard>
        <Toaster />
    </>
  )
}

export default App