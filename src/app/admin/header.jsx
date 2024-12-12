"use client";
import React from "react";
import { RiMenu3Fill } from "react-icons/ri";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@nextui-org/react";

import Sidebar from "./sidebar";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="h-12 shadow-one sticky top-0 z-50 bg-white flex justify-between items-center px-5">
      <div className="flex justify-between items-center gap-4">
        <p className="md:block block">
          <button onClick={onOpen}>
            <RiMenu3Fill />
          </button>
        </p>
        <h1 className="text-lg font-bold">Game Website</h1>
      </div>
      <Drawer placement="left" size="xs" isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Game Website
              </DrawerHeader>
              <DrawerBody>
                <Sidebar />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Header;
