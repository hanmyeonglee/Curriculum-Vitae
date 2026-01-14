---
title: "CV :: 이종원"
description: Curriculum Vitae for Lee Jongwon
author: 이종원
keywords:
  - CV
lang: ko
font: Pretendard
theme: min-light
tailwind: true
css:
  - https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css
---

<style>
    html {
        font-size: 14px;
    }
    h2 {
        color: #3787C8;
    }
    .vr {
        width: 0.1px;
        height: 100%;
        background-color: lightgrey;
        margin: auto;
    }
</style>

# CV :: 이종원 {.!mt-0}

--- {.!my-[10px]}

:::: div {.grid .grid-flow-col}

::: div

## Education {.!mt-[5px]}

### POSTECH {.!mb-[2px] .!mt-[5px]}

B.S. in Computer Science & Engineering  
2024.02 - Current

:::

::: div {.vr}
:::

::: div

## Contact {.!mt-[5px]}

![github_icon](./img/github.svg){.inline .translate-y-[-1.5px]} [hanmyeonglee](https://github.com/hanmyeonglee){target=_blank}  
![mail_icon](./img/envelop.svg){.inline .translate-y-[-0.5px]} [ejongwon7@postech.ac.kr](mailto:ejongwon7@postech.ac.kr)
![dreamhack_icon](./img/dreamhack.svg){.inline .translate-y-[-0.5px]} [_Nemo](https://dreamhack.io/users/60645){target=_blank}

:::

::::

--- {.!my-[10px]}

## Work Experiences

::::: div {.grid .grid-cols-[200px_1fr]}

:::: div

### Plask {.!mb-0}

::: div {.text-gray-500}

Software Engineering Intern  
2025.06 - 2025.09

:::

::::

:::: div

#### LLM 기반 게임 제작/배포 플랫폼 개발{.!mb-0}

`Supabase`{.!bg-gray-500 .text-white} `Babylon.js`{.!bg-gray-500 .text-white} `Typescript`{.!bg-gray-500 .text-white} `Colyseus.js`{.!bg-gray-500 .text-white} {.!mb-[5px]}

[Babylon.js 기반 ECS 프레임워크를 구축하고 Fine-tuned Gemini를 연동하여, 텍스트 프롬프트만으로 게임을 실시간 생성하고 Hot-load 하는 기능을 구현했습니다. GitHub 실시간 연동 시스템 개발 및 isolated-vm과 Colyseus.js를 활용한 서버 격리 아키텍처 설계로 안정성을 높였으며, Siggraph 2025에 부스 엔지니어로 참여해 기술 데모 시연 및 발표를 진행했습니다.]{.text-sm}

::::

:::::

::::: div {.grid .grid-cols-[200px_1fr]}

:::: div

### Dreamhack {.!mb-0}

::: div {.text-gray-500}

CTF Problem Setter  
2025.06 - 2025.07

:::

::::

:::: div

#### 화이트햇 스쿨 3기 CTF 문제 출제{.!mb-0}

`Web Hacking`{.!bg-gray-500 .text-white} `CTF`{.!bg-gray-500 .text-white} {.!mb-[5px]}

[웹 취약점을 응용한 5종의 워게임(Race Condition, Statistical DB Inference, ZIP Bomb DoS, CSS Injection, SVG XSS) 시나리오를 설계하고 출제했습니다.]{.text-sm}

::::

:::::

--- {.!my-[10px]}

## Research & Projects

::::: div {.grid .grid-cols-[200px_1fr]}

:::: div

### Babylonjs {.!mb-0}

::: div {.text-gray-500}

Open Source Contributor  
2025.07  
![link_icon](./img/link.svg){.inline .translate-y-[-0.5px]} [issue/16902](https://github.com/BabylonJS/Babylon.js/issues/16902){target=_blank}  
![link_icon](./img/link.svg){.inline .translate-y-[-0.5px]} [issue/16904](https://github.com/BabylonJS/Babylon.js/issues/16904){target=_blank}

:::

::::

:::: div

#### Babylonjs 오픈소스 기여 및 보안 취약점 제보{.!mb-0}

`Web Hacking`{.!bg-gray-500 .text-white} `Open Source`{.!bg-gray-500 .text-white} `Javascript`{.!bg-gray-500 .text-white} `XSS`{.!bg-gray-500 .text-white} {.!mb-[5px]}

[Babylon.js GUI 이미지 로더에서 SVG 파일 내 악성 스크립트가 실행되는 XSS 취약점을 발견 및 분석해 제보하여 Sanitizing 로직이 패치되어 보안이 강화됐습니다. 또한, AMD 환경 병용 시 특정 스크립트가 로드되지 않는 버그를 분석하여 제보했습니다.]{.text-sm}

::::

:::::

::::: div {.grid .grid-cols-[200px_1fr]}

:::: div

### Research {.!mb-0}

::: div {.text-gray-500}

Lead  
2024.09 - 2025.02  
![link_icon](./img/link.svg){.inline .translate-y-[-0.5px]} [report(pdf)](https://github.com/hanmyeonglee/Accelerating-TSP-using-GPU/blob/main/report.pdf){target=_blank}

:::

::::

:::: div

#### GPU 가속 기반 TSP 최적화 연구{.!mb-0}

`Python`{.!bg-gray-500 .text-white} `CUDA`{.!bg-gray-500 .text-white} `Genetic Algorithm`{.!bg-gray-500 .text-white} `Optimization`{.!bg-gray-500 .text-white} `Web`{.!bg-gray-500 .text-white} {.!mb-[5px]}

[CUDA와 Cupy를 활용하여 유전 알고리즘(Genetic Algorithm)을 GPU 상에서 병렬 처리하도록 구현 및 최적화했습니다. 4종의 Crossover 연산 비교와 Shuffle 계층 도입을 통해 연산 속도와 정확도를 증대시켰으며, Naver MAP API와 OpenStreetMap을 연계한 최적 경로 계산 웹 서비스를 개발하여 POSTECH 새내기 연구참여 우수사례 공모전에서 최우수상을 수상했습니다.]{.text-sm}

::::

:::::

::::: div {.grid .grid-cols-[200px_1fr]}

:::: div

### Project {.!mb-0}

::: div {.text-gray-500}

Lead  
2025.09 - 2025.12

:::

::::

:::: div

#### Scala 기반 내결함성 분산 정렬 시스템 개발{.!mb-0}

`Scala`{.!bg-gray-500 .text-white} `gRPC`{.!bg-gray-500 .text-white} `Co-Development`{.!bg-gray-500 .text-white} `Optimization`{.!bg-gray-500 .text-white} {.!mb-[5px]}

[gRPC 기반 Master-Worker 아키텍처를 설계하고 Worker 상태 직렬화를 통해 Fault Tolerance 메커니즘을 구현했습니다. Async Profiler 분석을 기반으로 Parallel GC 도입/raw data 병용 및 I/O 버퍼링을 최적화하여 기존 대비 약 20배의 성능 향상을 달성했으며, 명확한 코드 컨벤션 수립과 PR 중심의 협업 문화를 주도했습니다.]{.text-sm}

::::

:::::

--- {.!my-[10px]}

:::: div {.grid .grid-flow-col}

::: div

## Awards & Honors

**POSTECH 새내기 연구참여 우수사례 공모전** {.!mb-[2px] .!mt-[5px]}

최우수상 {.!mb-[2px]}

**2024 POSTECH-KAIST SCIENCE WAR CTF** {.!mb-[2px] .!mt-[5px]}

_Team.PLUS_, MVP {.!mb-[2px]}

**2024 HITCON CTF** {.!mb-[2px] .!mt-[5px]}

_Team.Cold Fusion_, 6th {.!mb-[2px]}

**2025 Plaid CTF** {.!mb-[2px] .!mt-[5px]}

_Team.Chill Fusion_, 12th {.!mb-[2px]}

**2025 DEFCON CTF** {.!mb-[2px] .!mt-[5px]}

_Team.Chill Fusion_, 10th

:::

::: div {.vr}
:::

::: div

## Skills

**Programming Languages** {.!mb-[2px] .!mt-[5px]}

Python, Javascript/Typescript, JAVA/Scala,  
PHP, SQL  {.!mb-[2px]}

**Frameworks** {.!mb-[2px] .!mt-[5px]}

Nextjs, Django, Flask  {.!mb-[2px]}

**Tools** {.!mb-[2px] .!mt-[5px]}

Docker, Git/GitHub, Linux

:::

::::
