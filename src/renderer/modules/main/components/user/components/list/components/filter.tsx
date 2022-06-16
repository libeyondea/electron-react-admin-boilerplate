import FormComponent from 'renderer/components/Form/components';
import useAppDispatch from 'renderer/hooks/useAppDispatch';
import useAppSelector from 'renderer/hooks/useAppSelector';
import {
  userListFilterQRequestAction,
  userListFilterSortByRequestAction,
  userListFilterSortDirectionRequestAction,
} from 'renderer/store/user/actions';
import { selectUserList } from 'renderer/store/user/selectors';
import * as filterConstant from 'renderer/constants/filter';
import { useState } from 'react';
import useDebouncedCallback from 'renderer/hooks/useDebouncedCallback';

type Props = {};

const FilterListUserComponent: React.FC<Props> = () => {
  const [q, setQ] = useState('');
  const dispatch = useAppDispatch();
  const userList = useAppSelector(selectUserList);

  const userListFilterQDebouncedCallback = useDebouncedCallback(
    (nextValue: string) => dispatch(userListFilterQRequestAction(nextValue))
  );

  const onChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(userListFilterSortByRequestAction(event.target.value));
  };

  const onChangeSortDirection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(userListFilterSortDirectionRequestAction(event.target.value));
  };

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQ(event.target.value);
    userListFilterQDebouncedCallback(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <div className="flex sm:items-center flex-col sm:flex-row mb-4 md:mb-0">
        <FormComponent.Select
          className="mr-4 mb-4 sm:mb-0"
          isHorizontal
          label="Sort by"
          onChange={onChangeSortBy}
          value={userList.filter.sort_by}
          name="sort_by"
          id="sort_by"
          options={[
            {
              value: 'first_name',
              label: 'First name',
            },
            {
              value: 'last_name',
              label: 'Last name',
            },
            {
              value: 'user_name',
              label: 'User name',
            },
            {
              value: 'email',
              label: 'Email',
            },
            {
              value: 'status',
              label: 'Status',
            },
            {
              value: 'role',
              label: 'Role',
            },
            {
              value: 'updated_at',
              label: 'Updated at',
            },
            {
              value: 'created_at',
              label: 'Created at',
            },
          ]}
        />
        <FormComponent.Select
          isHorizontal
          label="Sort direction"
          onChange={onChangeSortDirection}
          value={userList.filter.sort_direction}
          name="sort_direction"
          id="sort_direction"
          options={[
            {
              value: filterConstant.FILTER_SORT_DIRECTION_ASC,
              label: 'Ascending',
            },
            {
              value: filterConstant.FILTER_SORT_DIRECTION_DESC,
              label: 'Descending',
            },
          ]}
        />
      </div>
      <div className="flex items-center">
        <FormComponent.Input
          type="text"
          placeholder="Enter keyword"
          onChange={onChangeSearch}
          value={q}
          name="q"
          id="q"
        />
      </div>
    </div>
  );
};

export default FilterListUserComponent;
