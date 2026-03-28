import {
  FaReact, FaNodeJs, FaDatabase, FaPython, FaAws, FaJava,
  FaCloud, FaShieldAlt, FaGraduationCap, FaFileAlt, FaCode,
  FaGithub, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram,
  FaLaptopCode, FaServer, FaChartLine, FaDocker, FaNetworkWired,
  FaSearch, FaImage, FaLink, FaLock, FaProjectDiagram, FaFileExcel,
  FaChartBar, FaHome, FaEnvelope, FaTools,
} from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiJavascript, SiMongodb, SiTypescript,
  SiGraphql, SiFigma, SiPhp, SiLaravel, SiCplusplus, SiProgress,
} from "react-icons/si";
import { TiVendorMicrosoft } from "react-icons/ti";
import { TbBrandJavascript } from "react-icons/tb";
import { MdAnalytics } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { GrResume } from "react-icons/gr";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  // Dev & Frameworks
  FaReact, FaNodeJs, FaCode, FaLaptopCode, FaServer, FaDocker,
  SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript, SiGraphql,
  SiFigma, SiPhp, SiLaravel, SiCplusplus, SiProgress,

  // Data & DB
  FaDatabase, FaPython, FaChartLine, FaChartBar, FaProjectDiagram,
  FaFileExcel, FaSearch, FaImage, FaLink,
  SiMongodb, MdAnalytics,

  // Cloud & Security
  FaAws, FaCloud, FaShieldAlt, FaNetworkWired, FaLock,

  // Education & Career
  FaGraduationCap, FaFileAlt, FaJava,
  TbBrandJavascript, TiVendorMicrosoft,

  // Social
  FaGithub, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram,

  // Nav
  FaHome, FaEnvelope, FaTools,
  GiSkills, GrResume,
};

export function getIcon(name: string): IconType {
  return iconMap[name] || FaCode;
}

// Re-export commonly used icons for direct use in components
export {
  FaReact, FaGithub, FaFacebookF, FaTwitter, FaLinkedinIn,
  FaCode, FaFileAlt, FaCloud, FaLaptopCode, FaGraduationCap,
  FaAws, FaShieldAlt, FaEnvelope, FaHome, FaTools,
  SiNextdotjs, SiTailwindcss, SiJavascript, SiMongodb,
  TiVendorMicrosoft, SiFigma, SiPhp, SiLaravel,
  MdAnalytics, TbBrandJavascript,
};
