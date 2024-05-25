import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Button } from '../@/components/ui/button';
import { useReadContract } from 'wagmi'
import { useWriteContract } from 'wagmi'


const abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_startAmnt",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "giveGumball",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "inventory",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "takeGumball",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "viewCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
const address = "0xCc57BC13bb530Fc970C2a8b6635490212C4C68f9";

const Home: NextPage = () => {
  const result = useReadContract({
    abi: abi,
    address: address,
    functionName: 'viewCount',
  })
  const { writeContract } = useWriteContract()
  function takeGumball() {
    writeContract({ 
      abi: abi,
      address: address,
      functionName: 'takeGumball',
      args: [
      ],
   })
  }
  function giveGumball() {
    writeContract({ 
      abi: abi,
      address: address,
      functionName: 'giveGumball',
      args: [
      ],
   })
  }


  return (
    <main>
      <div className = "flex items-center justify-center">
        <ConnectButton/>
      </div>
      <div className = "flex items-center justify-center">
        Current Gumball Count:
        {result.data?.toString()}
      </div>
      <div className = "flex items-center justify-center p-2">
        <Button className = "bg-red-400" onClick = {() => takeGumball()}>
          Take A Gumball
        </Button>
      </div>
      <div className = "flex items-center justify-center p-2">
      <Button className = "bg-blue-400" onClick = {() => giveGumball()}>
          Give A Gumball
        </Button>
      </div>
    </main>
    
  );
};

export default Home;
