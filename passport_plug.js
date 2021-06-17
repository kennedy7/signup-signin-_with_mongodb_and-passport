options.encoding = options.encoding || 'hex';
  options.digestAlgorithm = options.digestAlgorithm || 'sha256'; // To get a list of supported hashes use crypto.getHashes()

  options.passwordValidator =
    options.passwordValidator ||
    function(password, cb) {
      cb(null);
    };
  options.passwordValidatorAsync =
    options.passwordValidatorAsync ||
    function(password) {
      return new Promise((resolve, reject) => {
        options.passwordValidator(password, err => (err ? reject(err) : resolve()));
      });
    };
  function defaultPasswordValidator(password, cb) {
    cb(null);
  }

  function defaultPasswordValidatorAsync(password) {
    return new Promise((resolve, reject) => {
      options.passwordValidator(password, err => (err ? reject(err) : resolve()));
    });
  }

  options.passwordValidator = options.passwordValidator || defaultPasswordValidator;
  options.passwordValidatorAsync = options.passwordValidatorAsync || defaultPasswordValidatorAsync;

  // Populate field names with defaults if not set
  options.usernameField = options.usernameField || 'username';
