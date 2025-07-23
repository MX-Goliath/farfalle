export interface ReasoningContent {
  reasoning: string;
  cleanContent: string;
  hasIncompleteReasoning: boolean;
}

/**
 * Extracts reasoning content from <think> tags and returns clean content
 */
export function extractReasoning(content: string): ReasoningContent {
  const completeThinkRegex = /<think>([\s\S]*?)<\/think>/gi;
  const incompleteThinkRegex = /<think>(?![\s\S]*?<\/think>)([\s\S]*)$/i;
  
  let reasoning = '';
  let hasIncompleteReasoning = false;
  
  // Extract all complete think content
  const completeMatches = content.match(completeThinkRegex);
  if (completeMatches) {
    reasoning = completeMatches
      .map(match => match.replace(/<\/?think>/gi, '').trim())
      .join('\n\n');
  }
  
  // Check for incomplete thinking (open tag without close)
  const incompleteMatch = content.match(incompleteThinkRegex);
  if (incompleteMatch) {
    hasIncompleteReasoning = true;
    // Add incomplete reasoning to the complete reasoning
    const incompleteContent = incompleteMatch[1].trim();
    if (incompleteContent) {
      reasoning = reasoning ? `${reasoning}\n\n${incompleteContent}` : incompleteContent;
    }
  }
  
  // Remove all think content (both complete and incomplete) from display content
  let cleanContent = content.replace(completeThinkRegex, '');
  if (hasIncompleteReasoning) {
    cleanContent = cleanContent.replace(incompleteThinkRegex, '');
  }
  
  return {
    reasoning: reasoning.trim(),
    cleanContent: cleanContent.trim(),
    hasIncompleteReasoning
  };
}

/**
 * Checks if content contains complete reasoning tags (only show reasoning section for complete blocks)
 */
export function hasReasoning(content: string): boolean {
  return /<think>[\s\S]*?<\/think>/i.test(content);
}

/**
 * Checks if content contains any reasoning tags (complete or incomplete)
 */
export function hasAnyReasoning(content: string): boolean {
  return /<think>/i.test(content);
} 