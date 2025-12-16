import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user-service";
import * as UserActions from "./user.actions";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions); 
  private userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(({ role }) =>
        this.userService.getUsers(role).pipe(
          map((users) => UserActions.loadUserSuccess({ users })),
          catchError((error) =>
            of(UserActions.loadUserFailure({ error }))
          )
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      exhaustMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map((createdUser) =>
            UserActions.addUserSuccess({ user: createdUser })
          ),
          catchError((error) =>
            of(UserActions.addUserFailure({ error }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ user }) =>
        this.userService.updateUser(user.id!, user).pipe(
          map((updatedUser) =>
            UserActions.updateUserSuccess({ user: updatedUser })
          ),
          catchError((error) =>
            of(UserActions.updateUserFailure({ error }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => UserActions.deleteUserSuccess({ id })),
          catchError((error) =>
            of(UserActions.deleteUserFailure({ error }))
          )
        )
      )
    )
  );
}