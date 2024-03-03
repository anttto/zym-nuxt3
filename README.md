## Type-checking
>   기본적으로 Nuxt는 성능상의 이유로 nuxi dev 또는 nuxi build를 실행할 때 타입을 확인하지 않습니다. 빌드 또는 개발 시 타입 검사를 활성화하려면 vue-tsc 및 typescript를 개발 종속성으로 설치하십시오.
```bash
npm install -D vue-tsc typescript
```


## ESLINT
1. eslint 를 적용할 수 있게 관련 모듈들을 설치
```bash
    "@nuxtjs/eslint-config-typescript": "^12.1.0",
    "@typescript-eslint/eslint-plugin": "^7.1.0",
    "@typescript-eslint/parser": "^7.1.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-nuxt": "^4.0.0",
    "eslint-plugin-prettier": "^5.1.3",
    "eslint-plugin-vue": "^9.22.0",
    "prettier": "^3.2.5",
```
2. ESLINT 설정 파일(.eslintrc.cjs) 에 룰을 지정했다. ---> 이것은 지킬 나의 룰들
3. lint script 를 설정함. (검사기능 등)
```bash
"scripts": {
    "build": "nuxi build",
    "dev": "nuxi dev",
    "generate": "nuxi generate",
    "preview": "nuxi preview",
    "postinstall": "nuxi prepare",
    "lint": "eslint \"**/*.{ts,tsx,vue,js}\" --fix",
    "lint-eslint": "eslint --ignore-path .gitignore **/*{ts,tsx,vue,js,json} --fix",
    "lint-prettier": "prettier --write \"**/*.(ts|tsx|vue|js|json)\""
  },
```
4. 여기까지가 eslint 를 프로젝트에 적용한 것임.
5. 이제 eslint 프로그램을 vscode 에서 자동으로 실행하고 와치하도록 하게 설정해야함
6. vscode 에 eslint extention 을 설치함
7. vscode setting 에 설정값 넣음



## Custom
- NuxtLink 를 삽입했을때 a 태그로 렌더링 되지 않고 속성만 사용하고 싶을 경우 custom 을 사용한다.
- custom 삽입함 (커스텀 속성 사용한다 선언)
- v-slot이용 (속성 넣음) : v-slot="{ navigate }
- @click="navigate" 으로 이벤트시 속성 사용하도록 지정

```bash
  <NuxtLink custom v-slot="{ navigate }" :to="`/course/${courseSlug}`">
    <CourseCard :title="title" :subtitle="subtitle" :thumbnail="thumbnail" @click="navigate" />
  </NuxtLink>
```


## TypeScript
```bash
# ~/types/course.ts
export interface Course {
  title: string;
  subtitle: string;
  courseSlug: string;
  content: string;
  thumbnail: string;
  video: string;
  rating: number;
  reviewsCount: number;
  studentCount: number;
  reviewsUrl: string;
  inflearnUrl: string;
  gymcodingUrl: string;
}

# 상단의 Course 타입을 확장하여 필요한 부분의 타입을 추가 하거나 변경함
export interface CourseWithPath
  extends Omit<Course, 'rating' | 'reviewsCount' | 'studentCount'> {
  rating: string;
  reviewsCount: string;
  studentCount: string;
  path: string;
}
```

#### 전역 타입 지정 (타입 훅?)

```bash
# ~/types/global.d.ts
export {};
declare global {
  type Maybe<T> = T | null | undefined
}
# type Maybe<T> = T | null | undefined;는 제네릭 타입 Maybe를 정의하고 있으며, 이는 주어진 타입 T, null, 또는 undefined 중 하나를 가질 수 있는 유니온 타입이다. 특정 값이 존재하지 않거나, 아직 할당되지 않았을 수 있는 상황을 타입 시스템에서 명시적으로 표현하고자 할 때 유용

# export {}; 와 함께 사용된 declare global은 TypeScript 모듈 내에서 전역 타입을 선언하는 방법.

```



## Route
```bash
<p>
  {{ $route.params }}
</p>
# path(param), query 모두 적용 가능 
```

## definePageMeta
핵 중요...

### 특수 메타데이터
1. alias
페이지 별칭(alias)을 정의할 수 있습니다. 이를 통해 여러 URL Path에서 동일한 페이지에 접근할 수 있습니다. vue-router 문서에 정의된 대로 문자열이거나 문자열 배열일 수 있습니다.
2. keepalive
definePageMeta에서 keepalive: true를 설정하면 Nuxt는 Vue의 <KeepAlive> 내장 컴포넌트에서 페이지 컴포넌트를 자동으로 래핑합니다. 예를 들어 동적 하위 경로가 있는 상위 경로에서 경로 변경 시 페이지 상태를 유지하려는 경우 이 작업을 수행하는 것이 유용할 수 있습니다.
상위 경로의 상태를 보존하는 것이 목표인 경우 <NuxtPage keepalive /> 구문을 사용하세요. <KeepAlive>에 전달되도록 Props를 설정할 수도 있습니다(여기에서 전체 목록 참조).
nuxt.config에서 이 속성에 대한 기본값을 설정할 수 있습니다.
3. key
<NuxtPage> 컴포넌트가 다시 렌더링될 때 더 많은 제어가 필요한 경우 키 값을 설정하세요.
4. layout
페이지 컴포넌트를 렌더링하는 데 사용되는 레이아웃을 정의할 수 있습니다. 어떤 방식으로든 반응적으로 만들려는 경우 false(레이아웃을 비활성화하기 위해), 문자열 또는 ref/computed 를 사용할 수 있습니다. 레이아웃에 대해 자세히 알아보세요.
layoutTransition 과 pageTransition
페이지(pages)와 레이아웃(layouts)을 래핑하는 <transition> 컴포넌트에 대한 전환 속성을 정의하거나 false를 전달하여 해당 경로에 대한 전환 래퍼를 비활성화할 수 있습니다. 여기에서 전달할 수 있는 옵션 목록을 보거나 전환 작동 방식에 대해 자세히 알아볼 수 있습니다.
nuxt.config에서 이러한 속성에 대한 기본값을 설정할 수 있습니다.
5. middleware
이 페이지를 로드하기 전에 적용할 미들웨어를 정의할 수 있습니다. 일치하는 상위/하위(parent/child) 경로에 사용되는 다른 모든 미들웨어와 병합됩니다. 문자열, 함수(전역 사전 보호 패턴을 따르는 익명/인라인 미들웨어 함수) 또는 문자열/함수의 배열일 수 있습니다. 명명된 미들웨어에 대해 자세히 알아보세요.
6. name
이 페이지 경로의 이름을 정의할 수 있습니다.
7. path
파일 이름으로 표현할 수 있는 것보다 더 복잡한 패턴이 있는 경우 path matcher를 정의할 수 있습니다. 자세한 내용은 vue-router 문서를 참조하세요.
```

## NUXTLINK
<NuxtLink>컴포넌트는 Vue Router의 <RouterLink> 컴포넌트와 HTML의 <a> 태그를 모두 즉시 대체함. 
링크가 내부인지 외부인지 지능적으로 결정하고 그에 따라 사용 가능한 최적화(프리페칭, 기본 속성 등)를 사용하여 링크를 렌더링.
```bash
<template>
  <NuxtLink to="https://nuxtjs.org">
    Nuxt website
  </NuxtLink>
  <!-- <a href="https://nuxtjs.org" rel="noopener noreferrer">...</a> -->
</template>
```
> Nuxt3 에서의 Prefetching은 웹 페이지를 로드하는 동안 브라우저가 미리 필요한 데이터를 미리 가져와서 사용자 경험을 최적화하는 기술. 이 기능은 페이지를 방문하기 전에 해당 페이지에 필요한 리소스를 미리 가져와서 사용자가 실제로 그 페이지로 이동할 때 로딩 시간을 단축 시킴.


## LAYOUT
```bash
<script setup lang="ts">
definePageMeta({
  layout: 'custom'
})
</script>
```



# 점검할 것들 (전적검색 nuxt)
1. 라우팅 (중첩라우팅을 활용한 데이터와 라우팅의 깔끔한 분리?)
2. 타입 정의 (api 위주로)
3. eslint / prettier 정리
