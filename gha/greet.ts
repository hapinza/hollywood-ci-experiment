
import {
  action,
  stringInput,
  stringOutput,
} from "@dedalus-labs/hollywood";

// Hollywood를 사용해 새로운 GitHub Action 정의
export const greet = action({
  name: "greet",
  description: "Generate a greeting message.",

  // GitHub Action에 전달받을 입력값 정의
  inputs: {
    name: stringInput({
      description: "Name of the person.",
    }),
  },

  // Action이 실행된 후 반환할 결과 정의
  outputs: {
    greeting: stringOutput({
      description: "Generated greeting message.",
    }),
  },

  // Action이 실행할 실제 로직
 
run: async ({ input }) => {
  // Action 실행 시작 기록
  console.log("[greet] Action started");

  // 입력값이 정상적으로 전달되었는지 확인
  console.log(`[greet] Received name: ${input.name}`);

  if (input.name === "crash") {
    // 실패 직전 상태를 로그로 기록
    console.log("[greet] About to trigger intentional failure");

    throw new Error("Intentional failure during execution");
  }

  const message = `Hello, ${input.name}!`;

  // 정상적으로 결과 생성이 완료되었음을 기록
  console.log("[greet] Greeting generated successfully");

  return { greeting: message };
},

});
