import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Server, Shield, Zap, Globe, Cpu, Gamepad2, Trophy } from 'lucide-react';
import LevelCard from './LevelCard';
import MissionModal from './MissionModal';
import RewardPopup from './RewardPopup';

export type LabLevel = {
  id: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  objective: string;
  instructions: string[];
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
};

const LAB_DATA: LabLevel[] = [
  {
    id: 1,
    title: "S3",
    category: "Storage",
    icon: <Database size={32} />,
    description: "Learn how to store objects in the cloud with Simple Storage Service.",
    objective: "Understand the difference between object and block storage.",
    instructions: [
      "1. S3 is an object storage service that offers industry-leading scalability, data availability, security, and performance.",
      "2. Data is stored as objects within buckets.",
      "3. Each object is typically composed of a file and optionally any metadata that describes that file."
    ],
    questions: [
      {
        question: "What does S3 stand for?",
        options: ["Simple Storage Service", "Secure Storage System", "Super Speed Storage", "Standard Storage Solution"],
        correctIndex: 0
      },
      {
        question: "Is S3 considered object storage or block storage?",
        options: ["Block Storage", "Object Storage", "File Storage", "Tape Storage"],
        correctIndex: 1
      }
    ]
  },
  {
    id: 2,
    title: "EC2",
    category: "Compute",
    icon: <Server size={32} />,
    description: "Launch and configure virtual servers in the cloud.",
    objective: "Master the basics of Elastic Compute Cloud instances.",
    instructions: [
      "1. EC2 provides secure, resizable compute capacity in the cloud.",
      "2. You can choose from a variety of instance types optimized for different use cases.",
      "3. Instances can be launched in different regions and availability zones."
    ],
    questions: [
      {
        question: "What does EC2 stand for?",
        options: ["Elastic Cloud Compute", "Elastic Compute Cloud", "Easy Cloud Computing", "Electronic Computer Cloud"],
        correctIndex: 1
      },
      {
        question: "Can you change the instance type of an existing EC2 instance?",
        options: ["No, never", "Yes, but only once", "Yes, by stopping the instance first", "Only if it's a T2 instance"],
        correctIndex: 2
      }
    ]
  },
  {
    id: 3,
    title: "IAM",
    category: "Security",
    icon: <Shield size={32} />,
    description: "Securely manage access to AWS services and resources.",
    objective: "Implement the principle of least privilege.",
    instructions: [
      "1. IAM enables you to manage access to AWS services and resources securely.",
      "2. Using IAM, you can create and manage AWS users and groups.",
      "3. Use permissions to allow and deny their access to AWS resources."
    ],
    questions: [
      {
        question: "What does IAM stand for?",
        options: ["Internal Access Management", "Identity and Access Management", "Internet Authorization Method", "Integrated AWS Management"],
        correctIndex: 1
      },
      {
        question: "Should you use the AWS Root user for daily administrative tasks?",
        options: ["Yes, it's easier", "No, use an IAM user with limited permissions", "Only if you have MFA enabled", "Only for billing tasks"],
        correctIndex: 1
      }
    ]
  },
  {
    id: 4,
    title: "Lambda",
    category: "Serverless",
    icon: <Zap size={32} />,
    description: "Run code without thinking about servers.",
    objective: "Understand event-driven serverless computing.",
    instructions: [
      "1. Lambda lets you run code without provisioning or managing servers.",
      "2. You pay only for the compute time you consume.",
      "3. Code is executed in response to triggers from other AWS services."
    ],
    questions: [
      {
        question: "Is AWS Lambda considered serverless?",
        options: ["Yes", "No", "Only for Python code", "Only in specific regions"],
        correctIndex: 0
      },
      {
        question: "Do you pay for Lambda when your code is NOT running?",
        options: ["Yes, a small monthly fee", "Yes, for the allocated memory", "No, you only pay for compute time used", "Only if you use provisioned concurrency"],
        correctIndex: 2
      }
    ]
  },
  {
    id: 5,
    title: "CloudFront",
    category: "CDN",
    icon: <Globe size={32} />,
    description: "Speed up distribution of your static and dynamic web content.",
    objective: "Learn how Content Delivery Networks work.",
    instructions: [
      "1. CloudFront is a fast content delivery network (CDN) service.",
      "2. It securely delivers data, videos, applications, and APIs to customers globally.",
      "3. It uses a global network of edge locations to reduce latency."
    ],
    questions: [
      {
        question: "What is the primary purpose of CloudFront?",
        options: ["Database storage", "Content Delivery Network (CDN)", "Virtual Private Cloud", "Machine Learning"],
        correctIndex: 1
      },
      {
        question: "What does CloudFront use to deliver content closer to users?",
        options: ["Main Regions", "Availability Zones", "Edge Locations", "S3 Buckets"],
        correctIndex: 2
      }
    ]
  },
  {
    id: 6,
    title: "DevOps",
    category: "Automation",
    icon: <Cpu size={32} />,
    description: "Automate your software development lifecycle.",
    objective: "Understand CI/CD pipelines and infrastructure as code.",
    instructions: [
      "1. DevOps is the combination of cultural philosophies, practices, and tools.",
      "2. It increases an organization’s ability to deliver applications and services at high velocity.",
      "3. CI/CD stands for Continuous Integration and Continuous Delivery/Deployment."
    ],
    questions: [
      {
        question: "What does CI/CD stand for?",
        options: ["Cloud Integration / Cloud Deployment", "Continuous Integration / Continuous Deployment", "Code Inspection / Code Delivery", "Computer Interface / Computer Design"],
        correctIndex: 1
      },
      {
        question: "Which of these is an AWS DevOps service for building pipelines?",
        options: ["AWS CodePipeline", "AWS S3", "AWS EC2", "AWS IAM"],
        correctIndex: 0
      }
    ]
  }
];

export default function Labs() {
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);
  const [selectedLab, setSelectedLab] = useState<LabLevel | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [xp, setXp] = useState(0);

  const handleLevelClick = (lab: LabLevel) => {
    if (unlockedLevels.includes(lab.id)) {
      setSelectedLab(lab);
    }
  };

  const handleLabComplete = () => {
    if (selectedLab) {
      const nextId = selectedLab.id + 1;
      if (nextId <= LAB_DATA.length && !unlockedLevels.includes(nextId)) {
        setUnlockedLevels(prev => [...prev, nextId]);
      }
      setXp(prev => prev + 50);
      setSelectedLab(null);
      setShowReward(true);
    }
  };

  return (
    <div id="labs" className="labs-container bg-[#0B1F3A] min-h-screen py-20 px-4 md:px-10 relative overflow-hidden font-sans text-white">
      {/* Floating AWS Icons Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 animate-pulse"><Database size={100} /></div>
        <div className="absolute bottom-20 right-10 animate-bounce"><Server size={80} /></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow"><Zap size={120} /></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 bg-purple-600/20 border border-purple-500/50 rounded-full mb-6"
          >
            <Gamepad2 className="text-purple-400" size={48} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            AWS Arcade Labs
          </h1>
          <p className="text-xl text-blue-200/70 font-medium">Complete missions to earn XP and unlock new cloud powers.</p>
          
          <div className="mt-8 flex justify-center gap-8">
            <div className="flex items-center gap-3 bg-black/40 px-6 py-3 rounded-full border border-purple-500/30">
              <Trophy className="text-yellow-500" size={24} />
              <span className="font-bold text-2xl">{xp} XP</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {LAB_DATA.map((lab) => (
            <LevelCard 
              key={lab.id} 
              lab={lab} 
              isLocked={!unlockedLevels.includes(lab.id)}
              onClick={() => handleLevelClick(lab)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedLab && (
          <MissionModal 
            lab={selectedLab} 
            onClose={() => setSelectedLab(null)} 
            onComplete={handleLabComplete}
          />
        )}
        {showReward && (
          <RewardPopup 
            onClose={() => setShowReward(false)} 
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .labs-container {
          background: radial-gradient(circle at top right, #1a0b3a, #0B1F3A);
        }
      `}</style>
    </div>
  );
}
