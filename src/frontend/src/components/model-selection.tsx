"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LightningBoltIcon, MagicWandIcon } from "@radix-ui/react-icons";
import {
  AtomIcon,
  BrainIcon,
  FlameIcon,
  Rabbit,
  RabbitIcon,
  SettingsIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react";
import { useConfigStore, useChatStore } from "@/stores";
import { ChatModel } from "../../generated";
import { isCloudModel, isLocalModel } from "@/lib/utils";

import _ from "lodash";
import { env } from "@/env.mjs";

type Model = {
  name: string;
  description: string;
  value: string;
  smallIcon: React.ReactNode;
  icon: React.ReactNode;
};

export const modelMap: Record<ChatModel, Model> = {
  [ChatModel.GPT_4O_MINI]: {
    name: "Fast",
    description: "OpenAI/GPT-4o-mini",
    value: ChatModel.GPT_4O_MINI,
    smallIcon: <RabbitIcon className="w-4 h-4 text-cyan-500" />,
    icon: <RabbitIcon className="w-5 h-5 text-cyan-500" />,
  },
  [ChatModel.GPT_4O]: {
    name: "Powerful",
    description: "OpenAI/GPT-4o",
    value: ChatModel.GPT_4O,
    smallIcon: <BrainIcon className="w-4 h-4 text-pink-500" />,
    icon: <BrainIcon className="w-5 h-5 text-pink-500" />,
  },
  [ChatModel.LLAMA_3_70B]: {
    name: "Hyper",
    description: "Groq/Qwen3-70B",
    value: ChatModel.LLAMA_3_70B,
    smallIcon: <LightningBoltIcon className="w-4 h-4 text-yellow-500" />,
    icon: <LightningBoltIcon className="w-5 h-5 text-yellow-500" />,
  },
  [ChatModel.Qwen3]: {
    name: "Qwen3",
    description: "ollama/qwen3:30b",
    value: ChatModel.Qwen3,
    smallIcon: <img src="/Qwen.png" alt="Qwen" className="w-4 h-4" />,
    icon: <img src="/Qwen.png" alt="Qwen" className="w-5 h-5" />,
  },
  [ChatModel.GEMMA]: {
    name: "Gemma",
    description: "ollama/gemma3:12b",
    value: ChatModel.GEMMA,
    smallIcon: <img src="/Gemma.png" alt="Gemma" className="w-4 h-4" />,
    icon: <img src="/Gemma.png" alt="Gemma" className="w-5 h-5" />,
  },
  [ChatModel.MISTRAL]: {
    name: "Mistral",
    description: "ollama/mistral-small-3.1:latest",
    value: ChatModel.MISTRAL,
    smallIcon: <img src="/Mistral_no_back.png" alt="Mistral" className="w-4 h-4" />,
    icon: <img src="/Mistral_no_back.png" alt="Mistral" className="w-5 h-5" />,
  },
  [ChatModel.PHI3_14B]: {
    name: "Phi3",
    description: "ollama/phi3:14b",
    value: ChatModel.PHI3_14B,
    smallIcon: <FlameIcon className="w-4 h-4 text-green-500" />,
    icon: <FlameIcon className="w-5 h-5 text-green-500" />,
  },
  [ChatModel.CUSTOM]: {
    name: "Custom",
    description: "Custom model",
    value: ChatModel.CUSTOM,
    smallIcon: <SettingsIcon className="w-4 h-4 text-red-500" />,
    icon: <SettingsIcon className="w-5 h-5 text-red-500" />,
  },
};

const localModelMap: Partial<Record<ChatModel, Model>> = _.pickBy(
  modelMap,
  (_, key) => isLocalModel(key as ChatModel),
);

const ModelItem: React.FC<{ model: Model }> = ({ model }) => (
  <SelectItem
    key={model.value}
    value={model.value}
    className="flex flex-col items-start p-2"
  >
    <div className="flex items-center space-x-2">
      {model.icon}
      <div className="flex flex-col">
        <span className="font-bold">{model.name}</span>
        <span className="text-muted-foreground">{model.description}</span>
      </div>
    </div>
  </SelectItem>
);

export function ModelSelection() {
  const { model, setModel } = useConfigStore();
  const selectedModel = modelMap[model] ?? modelMap[ChatModel.Qwen3];

  return (
    <Select
      defaultValue={model}
      value={model}
      onValueChange={(value) => {
        if (value) {
          setModel(value as ChatModel);
        }
      }}
    >
      <SelectTrigger className="w-fit space-x-2 bg-transparent outline-none border-none select-none focus:ring-0 shadow-none transition-all duration-200 ease-in-out hover:scale-[1.05] text-sm">
        <SelectValue>
          <div className="flex items-center space-x-2">
            {selectedModel.smallIcon}
            <span className="font-semibold">{selectedModel.name}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-[250px]">
        <SelectGroup className="w-full">
          {Object.values(localModelMap).map((model) => (
            <ModelItem key={model.value} model={model} />
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
