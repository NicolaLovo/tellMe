/**
 * Represents the possible statuses of a survey.
 * - 'created': The survey has been created but not yet published.
 * - 'published': The survey can be submitted by citizens.
 * - 'closed': The survey is no longer accepting responses.
 */
export type SurveyStatus = 'created' | 'published' | 'closed'
