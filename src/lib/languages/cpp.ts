export enum CompletionItemKind {
    Method = 0,
    Function = 1,
    Constructor = 2,
    Field = 3,
    Variable = 4,
    Class = 5,
    Struct = 6,
    Interface = 7,
    Module = 8,
    Property = 9,
    Event = 10,
    Operator = 11,
    Unit = 12,
    Value = 13,
    Constant = 14,
    Enum = 15,
    EnumMember = 16,
    Keyword = 17,
    Text = 18,
    Color = 19,
    File = 20,
    Reference = 21,
    Customcolor = 22,
    Folder = 23,
    TypeParameter = 24,
    User = 25,
    Issue = 26,
    Snippet = 27
}

export enum CompletionItemInsertTextRule {
    /**
     * Adjust whitespace/indentation of multiline insert texts to
     * match the current line indentation.
     */
    KeepWhitespace = 1,
    /**
     * `insertText` is a snippet.
     */
    InsertAsSnippet = 4
}

export interface CustomCompletionItem {
    /** Label is the thing that is displayed when invoking the completions */
    label: string;
    /** CompletionItemKind.Snippet / Keyword / Const* Class* function* */
    kind: CompletionItemKind;
    /** String explaining what the item does */
    documentation: string;
    /** Text with custom markers for snippets */
    insertText: string;
    /** InsertAsSnippet for Snippet, KeepWhitespace for the rest */
    insertTextRules?: CompletionItemInsertTextRule;
}

const keyword_map_c = [
]


function generate_completion_keyword(keyword: string): CustomCompletionItem {
    return {
        label: keyword,
        kind: CompletionItemKind.Keyword,
        documentation: keyword,
        insertText: keyword
    };
}














export const completions: CustomCompletionItem[] = [
]



// Provide all Keywords, snippets for if else, functions etc 
