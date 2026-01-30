(() => {
  const STORAGE_KEYS = {
    users: "ehnUsers",
    session: "ehnSession",
    posts: "ehnPosts",
    gesuche: "ehnGesuche",
    savedGesuche: "ehnSavedGesuche",
    orgProfiles: "ehnOrgProfiles",
  };

  const readJSON = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return fallback;
      }
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  };

  const writeJSON = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const createId = (prefix) =>
    `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  const getUsers = () => readJSON(STORAGE_KEYS.users, []);
  const saveUsers = (users) => writeJSON(STORAGE_KEYS.users, users);
  const getPosts = () => readJSON(STORAGE_KEYS.posts, []);
  const savePosts = (posts) => writeJSON(STORAGE_KEYS.posts, posts);
  const getGesuche = () => readJSON(STORAGE_KEYS.gesuche, []);
  const saveGesuche = (gesuche) => writeJSON(STORAGE_KEYS.gesuche, gesuche);
  const getSavedGesuche = () => readJSON(STORAGE_KEYS.savedGesuche, []);
  const saveSavedGesuche = (saved) => writeJSON(STORAGE_KEYS.savedGesuche, saved);
  const getOrgProfiles = () => readJSON(STORAGE_KEYS.orgProfiles, {});
  const saveOrgProfiles = (profiles) => writeJSON(STORAGE_KEYS.orgProfiles, profiles);

  const store = {
    createId,
    getSession: () => readJSON(STORAGE_KEYS.session, null),
    setSession: (session) => writeJSON(STORAGE_KEYS.session, session),
    clearSession: () => localStorage.removeItem(STORAGE_KEYS.session),
    findUserByEmail: (email) => getUsers().find((user) => user.email === email),
    saveUser: (user) => {
      const users = getUsers();
      users.push(user);
      saveUsers(users);
      return user;
    },
    getPosts,
    setPosts: savePosts,
    savePost: (post) => {
      const posts = getPosts();
      posts.unshift(post);
      savePosts(posts);
      return post;
    },
    getGesuche,
    setGesuche: saveGesuche,
    saveGesuch: (gesuch) => {
      const gesuche = getGesuche();
      gesuche.unshift(gesuch);
      saveGesuche(gesuche);
      return gesuch;
    },
    getSavedGesuche,
    toggleSavedGesuch: (id) => {
      const saved = new Set(getSavedGesuche());
      if (saved.has(id)) {
        saved.delete(id);
      } else {
        saved.add(id);
      }
      const updated = Array.from(saved);
      saveSavedGesuche(updated);
      return updated;
    },
    getOrgProfile: (userId) => {
      if (!userId) {
        return null;
      }
      const profiles = getOrgProfiles();
      return profiles[userId] || null;
    },
    setOrgProfile: (userId, profile) => {
      if (!userId) {
        return null;
      }
      const profiles = getOrgProfiles();
      profiles[userId] = profile;
      saveOrgProfiles(profiles);
      return profile;
    },
  };

  window.EHNStore = store;
})();
