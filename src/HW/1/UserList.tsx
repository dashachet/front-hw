type AddressType = {
  street: string,
  city: string; 
};

type UserType = {
  id: number,
  age: number,
  name: string,
  address: AddressType;
};

type UserListPropsType = {
  users: UserType[]; // ПО МОЕМУ ЧЕГО-ТО НЕ ХВАТАЕТ...
};

export const UserList = (props: UserListPropsType) => {
  return (
    <div id={'hw01-users'}>
      <h2>User List:</h2>
      <ul>
        {props.users.map((user) => {
          return (
            <li key={user.id}>
              <strong>{user.name}</strong> (Age: {user.age}) 
              <strong>Address:</strong>
              {user.address.street}, {user.address.city}
            </li>
          )})}
      </ul>
    </div>
  );
};
