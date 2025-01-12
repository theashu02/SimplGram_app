import { useAppStore } from "../../store"


export default function Profile() {
  const {userInfo} = useAppStore();
  return (
    <div>{userInfo?.email}</div>
  )
}
