import camelCase from 'lodash/camelCase';

export const createAction = (type, ...props) => {
  const actionCreatorName = camelCase(type);

  const actionCreator = (data = {}) => {
    const action = { type };
    props.forEach(property => {
      if (data.hasOwnProperty(property)) {
        action[property] = data[property];
      } else {
        action[property] = null;
      }
    });
    return action;
  };

  return { [type]: type, [actionCreatorName]: actionCreator };
};

export const createFetchListActionsGroup = name => ({
  ...createAction(`${name}_RESET_ACTION`),
  ...createAction(`${name}_LOAD_ACTION`, 'payload'),
  ...createAction(`${name}_LOAD_MORE_RETRY_ACTION`, 'payload'),
  ...createAction(`${name}_LOAD_MORE_ACTION`, 'payload'),

  ...createAction(`${name}_LOAD_REQUEST`),
  ...createAction(`${name}_LOAD_SUCCESS`, 'status', 'payload'),
  ...createAction(`${name}_LOAD_ERROR`, 'error', 'response'),

  ...createAction(`${name}_LOAD_MORE_REQUEST`),
  ...createAction(`${name}_LOAD_MORE_SUCCESS`, 'status', 'payload'),
  ...createAction(`${name}_LOAD_MORE_ERROR`, 'error', 'response'),

  ...createAction(`${name}_REFRESH_ACTION`),
  ...createAction(`${name}_REFRESH_REQUEST`),
  ...createAction(`${name}_REFRESH_ERROR`),
  ...createAction(`${name}_REFRESH_SUCCESS`),
});

export const createFetchDataActionsGroup = name => ({
  ...createAction(`${name}_RESET_ACTION`),
  ...createAction(`${name}_LOAD_ACTION`, 'payload'),

  ...createAction(`${name}_LOAD_REQUEST`),
  ...createAction(`${name}_LOAD_SUCCESS`, 'payload'),
  ...createAction(`${name}_LOAD_ERROR`, 'error', 'response'),

  ...createAction(`${name}_SAVE_DATA`, 'payload'),
  ...createAction(`${name}_SAVE_ACTION`, 'payload'),
});

export const createFetchDownloadActionsGroup = name => ({
  ...createAction(`${name}_DOWNLOAD_LOAD_ACTION`, 'payload'),
  ...createAction(`${name}_DOWNLOAD_SUCCESS`, 'payload'),
  ...createAction(`${name}_DOWNLOAD_ERROR`, 'payload'),
  ...createAction(`${name}_DOWNLOAD_CLEAR_ERROR`),
});
