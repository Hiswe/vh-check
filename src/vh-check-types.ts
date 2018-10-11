export type Callback = (...arg: any) => void

export type ComputeCallback = (result?: Result) => void

export interface Sizes {
  vh: number
  windowHeight: number
  offset: number
  isNeeded: boolean
  value: number
}

export type ComputeSizeMethod = () => Sizes

export interface Configuration {
  cssVarName?: string
  redefineVh?: boolean
  method?: ComputeSizeMethod
  force?: boolean
  bind?: boolean
  updateOnTouch?: boolean
  onUpdate?: ComputeCallback
}

export interface Result extends Sizes {
  unbind: Callback
  recompute: ComputeSizeMethod
}
