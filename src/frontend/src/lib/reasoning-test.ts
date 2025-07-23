import { extractReasoning, hasReasoning, hasAnyReasoning } from './reasoning';

// Test samples for reasoning functionality
export const testReasoningContent = `
<think>
Пользователь спрашивает о способах улучшения памяти. Мне нужно подумать о различных научно обоснованных методах:

1. Физические упражнения улучшают кровообращение мозга
2. Качественный сон консолидирует память  
3. Правильное питание обеспечивает мозг необходимыми веществами
4. Ментальные упражнения укрепляют нейронные связи
5. Стресс негативно влияет на память

Я должен дать практические советы, основанные на научных исследованиях.
</think>

# Как улучшить память: научно обоснованные методы

Память можно значительно улучшить с помощью нескольких проверенных подходов:

## Физическая активность
Регулярные упражнения увеличивают приток крови к мозгу и стимулируют рост новых нейронов.

## Качественный сон
Во время сна происходит консолидация памяти - перенос информации из кратковременной в долговременную память.

<think>
Также стоит упомянуть о том, что существуют специальные техники запоминания, которые могут быть полезны. Но не перегружу ответ слишком большим количеством информации.
</think>

## Правильное питание
Омега-3 жирные кислоты, антиоксиданты и витамины группы B особенно важны для здоровья мозга.

## Ментальные тренировки
Изучение нового, решение головоломок и игра на музыкальных инструментах создают новые нейронные связи.
`;

// Test incomplete reasoning (streaming scenario)
export const testIncompleteReasoningContent = `
<think>
Пользователь спрашивает о способах улучшения памяти. Мне нужно подумать о различных научно обоснованных методах:

1. Физические упражнения улучшают кровообращение мозга
2. Качественный сон консолидирует память

Пока что модель еще думает и не закрыла теги...

# Как улучшить память

Память можно значительно улучшить с помощью нескольких проверенных подходов...
`;

// Test the functionality
export function testReasoningExtraction() {
  console.log('=== Testing Complete Reasoning Extraction ===');
  
  const { reasoning, cleanContent, hasIncompleteReasoning } = extractReasoning(testReasoningContent);
  
  console.log('Has reasoning:', hasReasoning(testReasoningContent));
  console.log('Has any reasoning:', hasAnyReasoning(testReasoningContent));
  console.log('Has incomplete reasoning:', hasIncompleteReasoning);
  console.log('\n--- Extracted Reasoning ---');
  console.log(reasoning);
  console.log('\n--- Clean Content ---');
  console.log(cleanContent);
  
  console.log('\n=== Testing Incomplete Reasoning Extraction ===');
  
  const incomplete = extractReasoning(testIncompleteReasoningContent);
  
  console.log('Has reasoning:', hasReasoning(testIncompleteReasoningContent));
  console.log('Has any reasoning:', hasAnyReasoning(testIncompleteReasoningContent));
  console.log('Has incomplete reasoning:', incomplete.hasIncompleteReasoning);
  console.log('\n--- Extracted Reasoning (Incomplete) ---');
  console.log(incomplete.reasoning);
  console.log('\n--- Clean Content (Incomplete) ---');
  console.log(incomplete.cleanContent);
}

// Run test
if (typeof window === 'undefined') {
  // Only run in Node.js environment
  testReasoningExtraction();
} 