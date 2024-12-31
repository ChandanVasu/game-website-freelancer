"use client";

import React, { useEffect, useState } from "react";
import {
  Image,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { MdBugReport } from "react-icons/md";

import SideGame from "./sideGame";
import Side from "@/components/main/ad/side";
import Banner from "@/components/main/ad/banner";
import Banner2 from "@/components/main/ad/banner2";
import GridGameOne from "@/components/main/gameGridOne";
import Categorie from "@/components/main/categorie";
import { Textarea } from "@nextui-org/input";

export default function Game({ id }) {
  const [game, setGame] = useState([]);
  const [play, setPlay] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bug, setBug] = useState("");

  const fetchGame = async () => {
    console.log("Fetching game...");
    try {
      const response = await fetch(`/api/findgame?id=${id}`, {
        cache: "force-cache",
      });
      const data = await response.json();
      console.log(data);
      setGame(data);
    } catch (error) {
      console.error("Error fetching game:", error);
    }
  };

  const reportPost = async () => {
    console.log(bug);
    onClose();
  };

  useEffect(() => {
    fetchGame();
  }, [id]);

  return (
    <div className="px-2 md:px-6 mt-3">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Side Game Component */}
        <div className="w-full md:w-[300px] hidden md:block">
          <SideGame />
        </div>

        {/* Main Game Content */}
        <div className="w-full md:h-[550px] rounded-md shadow-one">
          <div>
            {!play ? (
              <div className="flex flex-col items-center min-h-[300px] md:min-h-[550px] gap-5 justify-center">
                <h1 className="text-2xl md:text-3xl font-bold text-center">
                  {game.title}
                </h1>
                <Image
                  className="w-full md:w-[300px] h-[150px] object-cover"
                  src={game.image}
                  alt={game.title}
                />
                <Button
                  size="lg"
                  className="bg-blue-800 text-white"
                  onPress={() => setPlay(true)}
                >
                  Play Game
                </Button>
              </div>
            ) : (
              <iframe
                className="w-full h-[300px] md:h-[550px] rounded-md shadow-one"
                src={game.url}
                title={game.title}
              />
            )}
          </div>

          {/* Game Info */}
          <div className="h-12 w-full shadow-one mt-2 rounded-md bg-slate-200 flex justify-between items-center px-5">
            <h1 className="text-base md:text-lg font-bold">{game.title}</h1>
            <div className="flex gap-5 items-center">
              <div className="flex gap-1 items-center">
                <FaEye />
                <span>{game.views}</span>
              </div>
              <MdBugReport
                onClick={onOpen}
                className="text-2xl cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Side Ad Component */}
        <div className="w-full md:w-[450px] hidden md:block">
          <Side />
        </div>
      </div>

      {/* Related Games Section */}
      <div>
        <div className="mt-5">
          <GridGameOne title="Related Games" />
        </div>

        <div className="space-y-4 mt-5">
          <Banner />
          <GridGameOne sort={true} title="Car Games" filterData="Car Games" />
          <Banner2 />
          <GridGameOne sort={true} title="Fighting" filterData="Fighting" />
          <Banner />
        </div>

        <div className="mt-5">
          <Categorie />
        </div>
      </div>

      {/* Bug Report Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Bug Report
            </ModalHeader>
            <ModalBody>
              <p>Please describe the issue you encountered with this game.</p>
              <Textarea
                className="max-w-full"
                label="Description"
                placeholder="Enter your description"
                value={bug}
                onChange={(e) => setBug(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={reportPost}>
                Submit
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
