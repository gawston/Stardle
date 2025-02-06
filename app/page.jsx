'use client'

import { useState, useEffect, use } from "react";
import initialCharacters from './data.js';
import Image from "next/image.js";

export default function Home() {
  const [search, setSearch] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [randomCharacter, setRandomCharacter] = useState(null);
  const [isWon, setIsWon] = useState(false);

  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * initialCharacters.length);
    setRandomCharacter(initialCharacters[randomIndex]);
  };

  const searchCharacter = (input) => {
    let data = [];
    if (input != "") {
      initialCharacters.filter((c) => {
        if (c.name.toLowerCase().includes(input.toLowerCase())) {
          data.push(c);
        }
      });
    }
    setSearch(data);
  };

  const changeSelectStage = (index, e) => {
    let data = [...search];
    data[index].select = true;
    if (!characters.some((c) => c.name === data[index].name)) {
      setCharacters([...characters, data[index]]);
      handleIsWon(data[index]);
    }
    document.getElementById('search').value = '';
    setSearch([]);
    console.log(characters);
  };

  useEffect(() => {
    getRandomCharacter();
  }, []);

  const handleIsWon = (data) => {
    let score = 0;
    if (data.name == randomCharacter.name) score++;
    if (data.img == randomCharacter.img) score++;
    if (data.combatType == randomCharacter.combatType) score++;
    if (data.path == randomCharacter.path) score++;
    if (data.star == randomCharacter.star) score++;

    if (score == 5) setIsWon(true);
  }

  const playAgain = () => {
    setCharacters([]);
    getRandomCharacter();
    initialCharacters.map((e) => {
      e.select = false;
    });
    setSearch([]);
    setIsWon(false);
  }

  console.log(randomCharacter);
  console.log(characters);

  return (
    <div className="flex flex-col items-center mx-auto px-2">
      <h1 className="text-5xl lg:text-8xl font-extrabold text-center uppercase mt-10">Stardle</h1>
      <p>Honkai: Star Rail Update 3.0</p>
      <div className="relative w-[340px]">
        <input type="text" list="characters" name="search" id="search" className="w-full h-10 mt-10 bg-transparent border border-[#555] focus:border-[#eee] focus:border-2 focus:outline-none rounded-[12px_0_0_0] pl-2" placeholder="Search Character. . . ." onChange={e => searchCharacter(e.target.value)}/>
        <div className="absolute max-h-[300px] bg-[#eee] text-black w-full border-x-2 border-[#eee] z-10 overflow-y-scroll">
          {search.map((data, index) => (
            <div className="flex items-center gap-4 p-2 border-b border-[#ccc] hover:bg-[#dadada] duration-150 cursor-pointer" key={index} onClick={(e) => changeSelectStage(index, e)}
              style={{ pointerEvents: data.select ? 'none' : 'auto', backgroundColor: data.select ? '#dadada' : '' }}
            >
              <Image width={50} height={50} src={data.img}  alt="" className="w-10 h-10 object-cover"/>
              {data.name}
            </div>
          ))}
        </div>
      </div>

      {/* head */}
      <div className="w-[350px] lg:w-[800px] grid grid-cols-5 text-center mt-8 bg-[#eee] border-x-2 text-black rounded-[12px_0_0_0] h-10 gap-[1px]">
        <div className="px-2 text-sm lg:text-lg truncate my-auto">Picture</div>
        <div className="px-2 text-sm lg:text-lg truncate my-auto">Name</div>
        <div className="px-2 text-sm lg:text-lg truncate my-auto">Combat Type</div>
        <div className="px-2 text-sm lg:text-lg truncate my-auto">Path</div>
        <div className="px-2 text-sm lg:text-lg truncate my-auto">Star</div>
      </div>

      {/* display character */}
      {characters.map((data, index) => (
        (data.select) ? (
          <div className="w-[350px] lg:w-[800px] grid grid-cols-5 text-center h-20 border-x-2 border-b-2 border-[#eee] gap-[1px] slide-in-bck-center scale-in-ver-top" key={index}>
            <div className="w-full h-full flex items-center justify-center relative px-2 my-auto mx-auto">
              <Image width={50} height={50} src={data.img}  alt="" className="w-12 h-12 object-cover"/>
              <div className="absolute w-full h-full opacity-70 z-[-1]" style={{backgroundColor: data.img == randomCharacter.img ? '#22c55e' : '#ef4444'}}></div>
            </div>
            <div className="w-full h-full flex items-center justify-center relative px-2 my-auto text-sm lg:text-lg truncate">
              {data.name}
              <div className="absolute w-full h-full opacity-70 z-[-1]" style={{backgroundColor: data.name == randomCharacter.name ? '#22c55e' : '#ef4444'}}></div>
            </div>
            <div className="w-full h-full flex items-center justify-center relative px-2 my-auto mx-auto">
              <Image width={50} height={50} src={data.combatType}  alt="" className="w-12 h-12 object-cover"/>
              <div className="absolute w-full h-full opacity-70 z-[-1]" style={{backgroundColor: data.combatType == randomCharacter.combatType ? '#22c55e' : '#ef4444'}}></div>
            </div>
            <div className="w-full h-full flex items-center justify-center relative px-2 my-auto mx-auto">
              <Image width={50} height={50} src={data.path}  alt="" className="w-12 h-12 object-cover"/>
              <div className="absolute w-full h-full opacity-70 z-[-1]" style={{backgroundColor: data.path == randomCharacter.path ? '#22c55e' : '#ef4444'}}></div>
            </div>
            <div className="w-full h-full flex items-center justify-center relative px-2 my-auto">
              {data.star}
              <div className="absolute w-full h-full opacity-70 z-[-1]" style={{backgroundColor: data.star == randomCharacter.star ? '#22c55e' : '#ef4444'}}></div>
            </div>
          </div>
        ) : null
      ))}

      {/* if dont have character data */}
      {(characters.length == 0) ? (
        <div className="w-[350px] lg:w-[800px] flex justify-center items-center text-center h-20 border-x-2 border-b-2 border-[#eee] gap-[1px] slide-in-bck-center">
            Display Characters . . . .
        </div>
      ) : null }

      {/* footer */}
      <div className="w-full flex justify-center items-center mt-32"></div>

      {/* popup */}
      {(isWon) ? (
        <div className="relative flex justify-center items-center">
          <div className="fixed top-80 w-[340px] lg:w-[500px] border border-[#eee] bg-[#171717] rounded-[12px_0_0_0] overflow-hidden scale-in-center">
            <div className="bg-[#eee] text-black w-full py-2">
              <p className="my-auto text-center">YOU WON!</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Image width={50} height={50} src={randomCharacter.img}  alt="" className="mt-8 w-20 h-20 object-cover"/>
              <p className="mt-2 uppercase">ANSWER IS {randomCharacter.name}</p>
              <button onClick={playAgain} className="bg-[#eee] text-black mt-6 mb-4 p-2 rounded-[12px_0_0_0]">PLAY AGAIN</button>
            </div>
          </div>
        </div>
      ) : null }
    </div>
  );
}
