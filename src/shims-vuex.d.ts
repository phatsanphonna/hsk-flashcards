import { Store } from '@/store';// path to store file
import User from '@/types/user.type'

declare module '@vue/runtime-core' {
    interface State {
        user: User
    }

    interface ComponentCustomProperties {
        $store: Store<User>;
    }
}