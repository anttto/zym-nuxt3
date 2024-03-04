# NUXT3 강의 정리

## ✅ Type-checking

```bash
npm install -D vue-tsc typescript
```


## ✅ ESLINT
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



## ✅ Custom

- 엘리먼트를 렌더링 하지 않고 속성만 사용하고 싶을 경우 custom 을 사용
- custom 삽입함 (커스텀 속성 사용 선언)
- v-slot이용 (속성 넣음)
- v-slot="{ navigate } === 내부의 자식 엘리먼트 중 해당 slot속성을 그대로 사용할 수 있게 됨.
- 아래는 @click="navigate" 으로 부모의 v-slot 속성을 사용하는 예시

```bash
  <NuxtLink custom v-slot="{ navigate }" :to="`/course/${courseSlug}`">
    <CourseCard :title="title" :subtitle="subtitle" :thumbnail="thumbnail" @click="navigate" />
  </NuxtLink>
```


## ✅ TypeScript

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

# CourseWithPath를 사용하는 컴포넌트 예시
import type { CourseWithPath } from '~/types/course';

interface CourseReturn {
  course: Maybe<CourseWithPath>; // Course | null | undefined
  prevCourse: Maybe<CourseWithPath>;
  nextCourse: Maybe<CourseWithPath>;
}
export const useCourse = (courseSlug: string): CourseReturn => {
  const { courses } = useCourses();
  const index = courses.findIndex((course) => course.courseSlug === courseSlug);
  const course = courses[index];
  const prevCourse = index <= 0 ? null : courses[index - 1];
  const nextCourse = index >= courses.length - 1 ? null : courses[index + 1];
  return {
    course,
    prevCourse,
    nextCourse,
  };
}
```

#### ✅ 전역 타입 지정 (타입 훅?)

```bash
# ~/types/global.d.ts
export {};
declare global {
  type Maybe<T> = T | null | undefined
}
# type Maybe<T> = T | null | undefined;는 제네릭 타입 Maybe를 정의하고 있으며, 이는 주어진 타입 T, null, 또는 undefined 중 하나를 가질 수 있는 유니온 타입이다. 특정 값이 존재하지 않거나, 아직 할당되지 않았을 수 있는 상황을 타입 시스템에서 명시적으로 표현하고자 할 때 유용

# export {}; 와 함께 사용된 declare global은 TypeScript 모듈 내에서 전역 타입을 선언하는 방법.

```

## ✅ Route
```bash
<p>
  {{ $route.params }}
</p>

<script setup lang="ts">
const route = useRoute();
const param = route.params; //params 전체 
const courseSlug = route.params.courseSlug as string; //courseSlug params 가져오기 (string 타입 강제 지정)
</script>
# path(params), query 모두 적용 가능 
```

## definePageMeta
핵 중요...

### ✅ 특수 메타데이터

1. alias
> 페이지 별칭(alias)을 정의할 수 있습니다. 이를 통해 여러 URL Path에서 동일한 페이지에 접근할 수 있습니다. vue-router 문서에 정의된 대로 문자열이거나 문자열 배열일 수 있습니다.

2. keepalive
> definePageMeta에서 keepalive: true를 설정하면 Nuxt는 Vue의 <KeepAlive> 내장 컴포넌트에서 페이지 컴포넌트를 자동으로 래핑합니다. 예를 들어 동적 하위 경로가 있는 상위 경로에서 경로 변경 시 페이지 상태를 유지하려는 경우 이 작업을 수행하는 것이 유용할 수 있습니다.
> 상위 경로의 상태를 보존하는 것이 목표인 경우 <NuxtPage keepalive /> 구문을 사용하세요. <KeepAlive>에 전달되도록 Props를 설정할 수도 있습니다(여기에서 전체 목록 참조). nuxt.config에서 이 속성에 대한 기본값을 설정할 수 있습니다.

3. key
> <NuxtPage> 컴포넌트가 다시 렌더링될 때 더 많은 제어가 필요한 경우 키 값을 설정하세요.

4. layout
> 페이지 컴포넌트를 렌더링하는 데 사용되는 레이아웃을 정의할 수 있습니다. 어떤 방식으로든 반응적으로 만들려는 경우 false(레이아웃을 비활성화하기 위해), 문자열 또는 ref/computed 를 사용할 수 있습니다. 

5. middleware
> 이 페이지를 로드하기 전에 적용할 미들웨어를 정의할 수 있습니다. 일치하는 상위/하위(parent/child) 경로에 사용되는 다른 모든 미들웨어와 병합됩니다. 문자열, 함수(전역 사전 보호 패턴을 따르는 익명/인라인 미들웨어 함수) 또는 문자열/함수의 배열일 수 있습니다. 

6. name
> 이 페이지 경로의 이름을 정의할 수 있습니다.

7. path
> 파일 이름으로 표현할 수 있는 것보다 더 복잡한 패턴이 있는 경우 path matcher를 정의할 수 있습니다. 자세한 내용은 vue-router 문서를 참조하세요.


## ✅ NUXTLINK

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


## ✅ LAYOUT

1. 레이아웃을 지정하지 않으면 layouts/default.vue가 사용됨
2. 애플리케이션에 단일 레이아웃만 있는 경우 대신 app.vue를 사용하는 것이 좋음

```bash
-| layouts/
---| default.vue
---| custom.vue

# ~/layouts/default.vue
<template>
  <div>
    <p>모든 페이지에서 공유되는 기본 레이아웃 콘텐츠</p>
    <slot />
  </div>
</template>

# custom layout (definePageMeta 이용)
definePageMeta({
  layout: 'custom'
})

# 동적 layout 처리 (setPageLayout 이용)

function enableCustomLayout () {
  setPageLayout('custom')
}
definePageMeta({
  layout: false,
});

<template>
  <div>
    <button @click="enableCustomLayout">Update layout</button>
  </div>
</template>

```

## ✅ navigateTo
> 페이지 탐색(이동) 함수

```bash
# 'to'를 문자열로 전달
await navigateTo('/search')

# ... 또는 라우트(route) 객체로
await navigateTo({ path: '/search' })

# ... 또는 쿼리 매개변수가 있는 라우트(route) 객체로
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc'
  }
})

# Route Middleware
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
		// 리디렉션 코드를 '301 Moved Permanently'으로 설정
    return navigateTo('/search', { redirectCode: 301 })
  }
})

# 외부 링크 
# 오류가 발생합니다.
# 외부 URL로의 이동은 기본적으로 허용되지 않습니다.
await navigateTo('https://nuxt.com')

# 'external' 매개변수를 'true'로 설정하면 성공적으로 리디렉션됩니다.
await navigateTo('https://nuxt.com', {
  external: true
})

# open 속성
# 새 탭에서 'https://nuxt.com'이 열립니다.
await navigateTo('https://nuxt.com', {  
  open: {
    target: '_blank',
    windowFeatures: {
      width: 500,
      height: 500
    }
  }
})

# 예시
const movePage = async (path: string) => {
  await navigateTo(path);
};
```



## ✅ plugins
1. Vue 애플리케이션 생성 시에 사용할 수 있는 플러그인 시스템
2. 자동으로 plugins/ 디렉토리의 파일을 읽어와 Vue 애플리케이션 생성 시에 로드
3. nuxt.config에 추가할 필요가 없음
4. 서버 또는 클라이언트 측에서 플러그인을 로드 .server | .client 접미사를 사용

```bash
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.... 
})
```

## ✅ Auto-imports
> Nuxt는 components, composables, helper functions (utils/..) 및 Vue API를 자동으로 가져옴


```bash
#Auto-imports 비활성화

# nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    autoImport: false
  }
})

#third-party 패키지 Auto-import

# nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n']
      }
    ]
  }
})

```


## ✅ Universal Rendering
> 브라우저가 범용(universal)(server-side + client-side)렌더링이 활성화된 URL을 요청하면 서버는 완전히 렌더링된 HTML 페이지를 브라우저에 반환합니다. 페이지가 미리 생성되어 캐시되었거나 즉시 렌더링되었는지 여부에 관계없이 어느 시점에서 Nuxt는 서버 환경에서 JavaScript(Vue.js) 코드를 실행하여 HTML 문서를 생성했습니다. 사용자는 클라이언트 측 렌더링과 달리 애플리케이션의 콘텐츠를 즉시 얻습니다. 이 단계는 PHP 또는 Ruby 애플리케이션에서 수행되는 기존 서버 측 렌더링과 유사합니다.

> 동적 인터페이스 및 페이지 전환과 같은 클라이언트 측 렌더링 방법의 이점을 잃지 않기 위해 클라이언트(브라우저)는 HTML 문서가 다운로드되면 백그라운드에서 서버에서 실행되는 JavaScript 코드를 로드합니다. 브라우저는 이를 다시 해석하고(따라서 Universal 렌더링 ) Vue.js는 문서를 제어하고 상호작용을 활성화합니다.

> 브라우저에서 정적 페이지를 Interective 하게 동적으로 만드는 것을 "Hydration"이라고 합니다.Universal rendering을 사용하면 Nuxt 애플리케이션이 Client-side rendering의 이점을 유지하면서 빠른 페이지 로드 시간을 제공할 수 있습니다. 또한 콘텐츠가 HTML 문서에 이미 존재하므로 크롤러는 오버헤드 없이 콘텐츠를 색인화할 수 있습니다.

## ✅ Hydration
> Nuxt3에서 하이드레이션은 서버에서 렌더링된 HTML을 클라이언트에서 동적으로 완성하는 과정을 말합니다. 하이드레이션을 통해 서버에서 렌더링된 HTML에 JavaScript를 추가하여 사용자 입력에 반응하거나 데이터를 동적으로 업데이트할 수 있습니다.

> Nuxt3는 SSR(Server-Side Rendering)을 지원합니다. SSR을 통해 서버에서 웹페이지를 완전히 렌더링하여 클라이언트로 전송할 수 있습니다. 이렇게 하면 웹페이지가 처음 로드될 때 더 빠르게 렌더링될 수 있습니다. 그러나 SSR은 클라이언트 측에서 JavaScript를 실행할 수 없기 때문에 사용자 입력에 반응하거나 데이터를 동적으로 업데이트할 수 없습니다. 이를 해결하기 위해 Nuxt3는 하이드레이션을 사용합니다.

> 하이드레이션을 통해 서버에서 렌더링된 HTML에 JavaScript를 추가하여 사용자 입력에 반응하거나 데이터를 동적으로 업데이트할 수 있습니다.


# 점검할 것들 (전적검색 nuxt)
1. 라우팅 (중첩라우팅을 활용한 데이터와 라우팅의 깔끔한 분리?)
2. 타입 정의 (api 위주로)
3. eslint / prettier 정리
4. nuxt3 배포시에 dist ? output 폴더 구분 (배포 서비스 확인)