import { RiHomeFill } from "react-icons/ri";
import {
  IoSearchOutline,
  IoExpandSharp,
  IoMusicalNotesSharp,
  IoPerson,
} from "react-icons/io5";
import { BiCabinet } from "react-icons/bi";
import {
  FaBell,
  FaHeadphones,
  FaFileAudio,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import {
  FaVolumeHigh,
  FaVolumeLow,
  FaVolumeOff,
  FaVolumeXmark,
  FaBackwardStep,
  FaForwardStep,
} from "react-icons/fa6";
import { TiArrowShuffle, TiArrowLoop } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdUpload, MdModeEditOutline, MdQueueMusic } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

export default {
  Home: RiHomeFill,
  Search: IoSearchOutline,
  Browse: BiCabinet,
  Notification: FaBell,
  TempLogo: FaHeadphones,
  Expand: IoExpandSharp,
  Dismiss: RxCross2,
  AudioFile: FaFileAudio,
  Loading: AiOutlineLoading3Quarters,
  Play: FaPlay,
  Pause: FaPause,
  NextMusic: FaForwardStep,
  PreviousMusic: FaBackwardStep,
  Shuffle: TiArrowShuffle,
  Loop: TiArrowLoop,
  Upload: MdUpload,
  DropDown: IoMdArrowDropdown,
  Edit: MdModeEditOutline,
  Note: IoMusicalNotesSharp,
  Artist: IoPerson,
  MusicQueue: MdQueueMusic,
  VolumeHigh: FaVolumeHigh,
  VolumeMedium: FaVolumeLow,
  VolumeLow: FaVolumeOff,
  VolumeZero: FaVolumeXmark,
};
