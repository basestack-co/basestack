export function flattenPermissions(obj: object): string[] {
  const result: string[] = [];

  const recurse = (node: any) => {
    for (const key in node) {
      const val = node[key];
      if (typeof val === "string") {
        result.push(val);
      } else if (typeof val === "object" && val !== null) {
        recurse(val);
      }
    }
  };

  recurse(obj);
  return result;
}

export const PERMISSIONS = {
  PROJECT: {
    GENERAL: {
      VIEW: "project:general:view",
      CREATE: "project:general:create",
      UPDATE: "project:general:update",
      DELETE: "project:general:delete",
    },
    KEYS: {
      VIEW: "project:keys:view",
      CREATE: "project:keys:create",
      UPDATE: "project:keys:update",
      DELETE: "project:keys:delete",
    },
    MONITORS: {
      VIEW: "project:monitors:view",
      CREATE: "project:monitors:create",
      UPDATE: "project:monitors:update",
      DELETE: "project:monitors:delete",
    },
    FLAGS: {
      VIEW: "project:flags:view",
      CREATE: "project:flags:create",
      UPDATE: "project:flags:update",
      DELETE: "project:flags:delete",
    },
    ENVIRONMENTS: {
      VIEW: "project:environments:view",
      CREATE: "project:environments:create",
      UPDATE: "project:environments:update",
      DELETE: "project:environments:delete",
    },
    SETTINGS: {
      VIEW: "project:settings:view",
      UPDATE: "project:settings:update",
    },
    MEMBERS: {
      VIEW: "project:members:view",
      CREATE: "project:members:create",
      UPDATE: "project:members:update",
      DELETE: "project:members:delete",
    },
  },
  FORM: {
    GENERAL: {
      VIEW: "form:general:view",
      CREATE: "form:general:create",
      UPDATE: "form:general:update",
      DELETE: "form:general:delete",
    },
    SUBMISSIONS: {
      VIEW: "form:submissions:view",
      CREATE: "form:submissions:create",
      UPDATE: "form:submissions:update",
      DELETE: "form:submissions:delete",
    },
    SETTINGS: {
      VIEW: "form:settings:view",
      UPDATE: "form:settings:update",
    },
    MEMBERS: {
      VIEW: "form:members:view",
      CREATE: "form:members:create",
      UPDATE: "form:members:update",
      DELETE: "form:members:delete",
    },
  },
};

const FLATTENED_PERMISSIONS = {
  PROJECT: flattenPermissions(PERMISSIONS.PROJECT),
  FORM: flattenPermissions(PERMISSIONS.FORM),
  PROJECT_ENVIRONMENTS: flattenPermissions(PERMISSIONS.PROJECT.ENVIRONMENTS),
  PROJECT_FLAGS: flattenPermissions(PERMISSIONS.PROJECT.FLAGS),
  PROJECT_MONITORS: flattenPermissions(PERMISSIONS.PROJECT.MONITORS),
  FORM_SUBMISSIONS: flattenPermissions(PERMISSIONS.FORM.SUBMISSIONS),
} as const;

const ROLE_PERMISSIONS = {
  ADMIN: [...FLATTENED_PERMISSIONS.PROJECT, ...FLATTENED_PERMISSIONS.FORM],
  DEVELOPER: [
    ...FLATTENED_PERMISSIONS.PROJECT_ENVIRONMENTS,
    ...FLATTENED_PERMISSIONS.PROJECT_FLAGS,
    ...FLATTENED_PERMISSIONS.FORM_SUBMISSIONS,
    PERMISSIONS.PROJECT.SETTINGS.VIEW,
    PERMISSIONS.FORM.SETTINGS.VIEW,
  ],
  TESTER: [
    PERMISSIONS.PROJECT.FLAGS.VIEW,
    PERMISSIONS.FORM.SUBMISSIONS.VIEW,
    PERMISSIONS.FORM.SETTINGS.VIEW,
  ],
  VIEWER: [
    PERMISSIONS.FORM.SUBMISSIONS.VIEW,
    PERMISSIONS.PROJECT.MONITORS.VIEW,
    PERMISSIONS.PROJECT.FLAGS.VIEW,
    PERMISSIONS.PROJECT.ENVIRONMENTS.VIEW,
    PERMISSIONS.PROJECT.MEMBERS.VIEW,
    PERMISSIONS.FORM.GENERAL.VIEW,
  ],
  OPERATOR: [
    ...FLATTENED_PERMISSIONS.PROJECT_MONITORS,
    PERMISSIONS.PROJECT.SETTINGS.VIEW,
  ],
} as const;

const ROLE_PERMISSION_SETS = Object.fromEntries(
  Object.entries(ROLE_PERMISSIONS).map(([role, permissions]) => [
    role,
    new Set(permissions),
  ])
) as Record<keyof typeof ROLE_PERMISSIONS, Set<string>>;

export const hasPermission = (
  role: string | undefined,
  permission: string
): boolean => {
  const normalizedRole = (role ??
    "VIEWER") as keyof typeof ROLE_PERMISSION_SETS;
  const permissionSet = ROLE_PERMISSION_SETS[normalizedRole];

  return permissionSet?.has(permission) ?? false;
};
