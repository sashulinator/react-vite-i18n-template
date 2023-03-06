export interface IfProps<T extends React.ReactNode> {
  children: T
  is: undefined | unknown
}

export default function If<T extends React.ReactNode>(props: IfProps<T>): T | null {
  return !props.is ? null : props.children
}

If.dispayName = 'If'
