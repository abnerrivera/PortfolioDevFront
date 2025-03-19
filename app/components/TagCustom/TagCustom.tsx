import {FC} from 'react'
import styles from './TagCustom.module.css'

interface TagCustomProps {
    text: string;
    variable?: 'primary' | 'secondary' | 'danger' | 'warn' | 'black' | 'gray'
}
const TagCustom: FC<TagCustomProps> = ({text, variable = 'primary'}) => {
  return (
    <span className={`${styles.tag} ${styles[variable]}`}>{text}</span>
  )
}

export default TagCustom