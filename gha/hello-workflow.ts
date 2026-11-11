
import {
  generateWorkflowFile,
  job,
  uses,
  workflow,
} from "@dedalus-labs/hollywood";

// 이전에 작성한 greet Action을 가져오기
import { greet } from "./greet";

export const helloWorkflow = workflow({
  name: "Hollywood CI Experiment",

  // main 브랜치에 Push하거나 수동 실행할 때 동작
  on: {
    push: { branches: ["main"] },
    workflow_dispatch: {},
  },

  // 저장소 내용을 읽는 최소 권한
  permissions: { contents: "read" },

  jobs: {
    greeting: job({
      // GitHub가 제공하는 Linux 서버에서 실행
      "runs-on": "ubuntu-latest",

      steps: [
        {
          // GitHub 서버에 저장소 코드 가져오기
          uses: "actions/checkout@df4cb1c069e1874edd31b4311f1884172cec0e10",
        },

        // 우리가 Hollywood로 만든 greet Action 실행
        {
  // GitHub 저장소 안에 있는 로컬 Action의 경로 지정
  name: "Run greeting action",
  uses: "./.github/actions/greet",
  with: {
    name: "Seongho",
  },
},
      ],
    }),
  },
});

// TypeScript Workflow를 GitHub YAML로 변환할 설정
export default generateWorkflowFile({
  sourcePath: "gha/hello-workflow.ts",
  sourceRoot: "gha",
  workflowsDir: ".github/workflows",
  workflow: helloWorkflow,
});
