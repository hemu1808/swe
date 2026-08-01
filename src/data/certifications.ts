export interface CertificationItem {
  title: string;
  organization: string;
  date: string;
  iconName:
    | "LineChart"
    | "BrainCircuit"
    | "Fingerprint"
    | "Code2"
    | "MessageSquare"
    | "Calculator"
    | "Terminal"
    | "Lightbulb"
    | "Award";
  color: string;
  credentialId?: string;
}

export const certificationsData: CertificationItem[] = [
  {
    title: "Data Analytics",
    organization: "Cisco",
    date: "Jul 2024",
    iconName: "LineChart",
    color: "text-blue-500",
  },
  {
    title: "Tweet Emotion Recognition with TensorFlow",
    organization: "Coursera Project Network",
    date: "Jun 2024",
    iconName: "BrainCircuit",
    color: "text-purple-500",
    credentialId: "PHSXVRV6LDSZ",
  },
  {
    title: "Facial Expression Recognition with PyTorch",
    organization: "Coursera Project Network",
    date: "Jun 2024",
    iconName: "Fingerprint",
    color: "text-orange-500",
    credentialId: "XSNRHCHF8646",
  },
  {
    title: "Intro to Basic Game Development using Scratch",
    organization: "Coursera Project Network",
    date: "Jun 2024",
    iconName: "Code2",
    color: "text-green-500",
    credentialId: "8S2U8XT26M3C",
  },
  {
    title: "Create a Lead Generation Messenger Chatbot using Chatfuel",
    organization: "Coursera Project Network",
    date: "Jun 2024",
    iconName: "MessageSquare",
    color: "text-blue-400",
    credentialId: "R6NUNYC4W9NQ",
  },
  {
    title: "Data Science Math Skills",
    organization: "Duke University",
    date: "Jul 2024",
    iconName: "Calculator",
    color: "text-indigo-500",
    credentialId: "5WRMJTP89FZT",
  },
  {
    title: "Programming for Everybody (Getting Started with Python)",
    organization: "University of Michigan",
    date: "Sep 2020",
    iconName: "Terminal",
    color: "text-yellow-600",
    credentialId: "NT2WACYV7XSR",
  },
  {
    title: "Python 101 for Data Science",
    organization: "Cognitive Class",
    date: "Aug 2024",
    iconName: "Code2",
    color: "text-yellow-500",
    credentialId: "17969e36998e4812b78c53925a91452e",
  },
  {
    title: "The Art of Prompt Engineering",
    organization: "Cognitive Class",
    date: "Aug 2024",
    iconName: "Lightbulb",
    color: "text-emerald-500",
    credentialId: "bc0778173bad4c67814bc8fe0bea51e8",
  },
  {
    title: "Create Your Own ChatGPT-like Website with LLMs",
    organization: "Cognitive Class",
    date: "Aug 2024",
    iconName: "Award",
    color: "text-pink-500",
    credentialId: "f333c5a1c1564694891db54ee58ada60",
  },
  {
    title: "Automate the Boring Stuff With LLMs",
    organization: "Cognitive Class",
    date: "Aug 2024",
    iconName: "BrainCircuit",
    color: "text-rose-500",
    credentialId: "338cfd854d854f148c6f6fcfd38a0a95",
  },
];
